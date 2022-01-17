export interface Insight {
  categories: {
    [name: string]: {
      questions_count: number;
      correct_count: number;
      correct_ratio: number;
      weight: number;
    };
  };
  created_at: string;
}
