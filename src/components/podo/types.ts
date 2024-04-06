export type TypeGrape = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'none';
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
