import type { PropDef } from '../components/docs/ComponentDoc';

export interface A11ySummary {
  keyboard: string[];
  aria: string[];
  contrast: string;
  score: number;
}

export interface AtomData {
  id: string;
  name: string;
  description: string;
  a11ySummary?: A11ySummary;
  code: string;
  filename: string;
  props: PropDef[];
  guidelines?: string[];
  aiNotes?: string;
}

export interface MoleculeData {
  id: string;
  name: string;
  description: string;
  a11ySummary?: A11ySummary;
  code: string;
  filename: string;
  props: PropDef[];
  guidelines?: string[];
  aiNotes?: string;
}

export interface OrganismData {
  id: string;
  name: string;
  description: string;
  a11ySummary?: A11ySummary;
  code: string;
  filename: string;
  props: PropDef[];
  guidelines?: string[];
  aiNotes?: string;
}
