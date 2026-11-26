export interface ISerie {
  id: number;
  name: string;
  language: string;
  genres: string[];
  status: string;
  premiered: string | null;
  summary: string | null;
  image: {
    medium: string;
    original: string;
  } | null;
}
