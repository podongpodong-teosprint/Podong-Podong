export type TypeGrape = 0 | 1 | 2 | 3 | 4;
export type TypeGrapeShape = {
  cx: number;
  cy: number;
  r: number;
};

export type TypeGrapeStyle = {
  fill: string;
  fillOpacity: string;
  stroke: string;
  strokeWidth?: string;
  strokeDasharray?: string;
};

export type TypeBookSchema = {
  bookId: number;
  title: string;
  description: string;
  author: string;
  link: string;
  translator?: string;
  publisher?: string;
  ISBN?: string;
  pages?: number;
  year?: string;
};

export type TypeMyBookStatus = 'reading' | 'completed' | 'wish';

export type TypeMyBookSchema = {
  myBookId: number;
  status: TypeMyBookStatus;
} & TypeBookSchema;

export type TypeMemorySchema = {
  id: string;
  memory: string;
  date: string;
  density: TypeGrape;
};
