export interface HistoricalStage {
    id: number;
    title: string;
    description: string;
    year: string;
  }
  
  export interface Concept {
    id: string;
    term: string;
    definition: string;
    example: string;
  }
  
  export interface Myth {
    id: number;
    myth: string;
    fact: string;
  }
  
  export enum SectionId {
    Hero = 'hero',
    Quote = 'quote',
    Origins = 'origins',
    Concepts = 'concepts',
    Meter = 'meter',
    Flow = 'flow',
    Timeline = 'timeline',
    Simulator = 'simulator',
    Myths = 'myths',
    Future = 'future'
  }