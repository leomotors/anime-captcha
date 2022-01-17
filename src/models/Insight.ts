export interface Insight {
  categories: {
    [name: string]: {
      questions_count: number;
      correct_count: number;
      correct_ratio: number;
    };
  };
  score_scale: {
    [score: number]: number;
  };
  created_at: string;
}
