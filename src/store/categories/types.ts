export type Categories = 'good' | 'bad' | 'actions' | 'ideas';

export type Card = {
  description: string;
  id: string;
  title: string;
  votes: string[];
};

export type CategoriesData = {
  [key in Categories]: Card[];
} | null;
