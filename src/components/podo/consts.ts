import { TypeGrape, TypeGrapeShape, TypeGrapeStyle } from './types';

export const styleByType: Record<TypeGrape, TypeGrapeStyle> = {
  primary: {
    fill: '#645CBB',
    stroke: '#645CBB',
    strokeWidth: '2',
    fillOpacity: '0.9',
  },
  secondary: {
    fill: '#A084DC',
    stroke: '#A084DC',
    strokeWidth: '2',
    fillOpacity: '0.9',
  },
  tertiary: {
    fill: '#BFACE2',
    stroke: '#A084DC',
    strokeWidth: '2',
    fillOpacity: '0.9',
  },
  quaternary: {
    fill: '#EBC7E6',
    stroke: '#BFACE2',
    strokeWidth: '2',
    fillOpacity: '0.9',
  },
  none: {
    fill: '#E9E9E9',
    stroke: 'black',
    strokeDasharray: '2 2',
    fillOpacity: '0.5',
  },
};

export const grapes: TypeGrapeShape[] = [
  {
    cx: 52.9733,
    cy: 137.973,
    r: 37.8151,
  },
  {
    cx: 117.973,
    cy: 123.973,
    r: 37.8151,
  },
  {
    cx: 164.973,
    cy: 84.9732,
    r: 37.8151,
  },
  {
    cx: 50.9733,
    cy: 204.973,
    r: 37.8151,
  },
  {
    cx: 101.973,
    cy: 192.973,
    r: 37.8151,
  },
  {
    cx: 168.973,
    cy: 160.973,
    r: 37.8151,
  },
  {
    cx: 212.973,
    cy: 114.973,
    r: 37.8151,
  },
  {
    cx: 101.973,
    cy: 252.973,
    r: 37.8151,
  },
  {
    cx: 164.973,
    cy: 220.973,
    r: 37.8151,
  },
  {
    cx: 224.973,
    cy: 185.973,
    r: 37.8151,
  },
  {
    cx: 142.973,
    cy: 294.973,
    r: 37.8151,
  },
  {
    cx: 194.973,
    cy: 283.973,
    r: 37.8151,
  },
  {
    cx: 234.973,
    cy: 245.973,
    r: 37.8151,
  },
  {
    cx: 194.973,
    cy: 345.973,
    r: 37.8151,
  },
  {
    cx: 251.973,
    cy: 312.973,
    r: 37.8151,
  },
  {
    cx: 245.973,
    cy: 374.973,
    r: 37.8151,
  },
];
