import React, { useEffect, useRef, useState } from 'react';
import { Disc, Play, Pause, SkipForward, Volume2, VolumeX, Minimize2, Maximize2 } from 'lucide-react';
import gsap from 'gsap';

const PLAYLIST = [
    { title: "FUNK CRIMINAL (SLOWED)", file: "FUNK CRIMINAL (SLOWED) - ICEDMANE.mp3" },
    { title: "Skins (Slowed + Reverb)", file: "KREZUS, Surreal_dvd - Skins (Slowed + Reverb) - Sushino.mp3" },
    { title: "AURA Slowed", file: "Ogryzek - AURA Slowed (Official Visualiser) - Ogryzek.mp3" },
    { title: "DARE (Slowed)", file: "Sayfalse, TRXVELER & DJ ALIM - DARE (Slowed) - 7clouds Phonk.mp3" },
    { title: "Bohemian (Slowed)", file: "milord - bohemian (slowed) - Milord.mp3" }
];

interface MusicPlayerProps {
    autoPlayTrigger?: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoPlayTrigger = false }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const diskRef = useRef<HTMLDivElement>(null);

    // Initialize Audio
    useEffect(() => {
        audioRef.current = new Audio(`/fonk/${PLAYLIST[0].file}`);
        audioRef.current.volume = 0.5;

        // Auto next track
        audioRef.current.addEventListener('ended', handleNext);

        return () => {
            audioRef.current?.pause();
            audioRef.current?.removeEventListener('ended', handleNext);
        };
    }, []);

    // Handle Track Changes
    useEffect(() => {
        if (audioRef.current) {
            if (audioRef.current.src !== window.location.origin + `/fonk/${encodeURIComponent(PLAYLIST[currentTrack].file)}`) {
                audioRef.current.src = `/fonk/${PLAYLIST[currentTrack].file}`;
                if (isPlaying) {
                    audioRef.current.play().catch(e => console.log("Playback error:", e));
                }
            }
        }
    }, [currentTrack]);

    // Handle Play/Pause
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => {
                    console.log("Autoplay blocked, waiting for interaction", e);
                    setIsPlaying(false);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    // Handle AutoPlay Trigger (from App when intro finishes)
    useEffect(() => {
        if (autoPlayTrigger && !hasInteracted) {
            setIsPlaying(true);
            setHasInteracted(true);
        }
    }, [autoPlayTrigger, hasInteracted]);

    // Handle Mute
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
        }
    }, [isMuted]);

    // Animation for Disk
    useEffect(() => {
        if (isPlaying) {
            gsap.to(diskRef.current, { rotation: "+=360", duration: 3, repeat: -1, ease: "none" });
        } else {
            gsap.killTweensOf(diskRef.current);
        }
    }, [isPlaying]);

    const handleNext = () => {
        setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length);
        setIsPlaying(true);
    };

    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <div
            ref={containerRef}
            className={`fixed bottom-4 left-4 z-50 transition-all duration-300 ease-out ${isExpanded ? 'w-64' : 'w-12'} h-12 bg-black border border-red-900/50 rounded-full flex items-center shadow-[0_0_15px_rgba(220,38,38,0.3)] overflow-hidden`}
        >
            {/* Minimized / Icon Section */}
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center cursor-pointer bg-red-950/20 hover:bg-red-900/40 transition-colors" onClick={toggleExpand}>
                <div ref={diskRef} className="relative">
                    <Disc size={24} className={`text-red-500 ${isPlaying ? 'opacity-100' : 'opacity-70'}`} />
                    {isPlaying && <div className="absolute inset-0 bg-red-500 rounded-full blur-md opacity-20"></div>}
                </div>
            </div>

            {/* Expanded Controls */}
            <div className={`flex flex-1 items-center justify-between px-3 min-w-[200px] ${isExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                <div className="flex flex-col overflow-hidden max-w-[100px]">
                    <span className="text-[10px] uppercase text-red-500 font-bold truncate tracking-wider">{PLAYLIST[currentTrack].title}</span>
                    <span className="text-[8px] text-red-500/50 font-mono">{(audioRef.current?.currentTime || 0).toFixed(0)}s</span>
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="p-1 hover:text-white text-red-500 transition-colors">
                        {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                    <button onClick={handleNext} className="p-1 hover:text-white text-red-500 transition-colors">
                        <SkipForward size={14} />
                    </button>
                    <button onClick={() => setIsMuted(!isMuted)} className="p-1 hover:text-white text-red-500 transition-colors">
                        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
