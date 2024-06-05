export type DetailDTO = {
  id: number;
  name: string;
  about: string;
  material: string;
  weight: number;
  cost: number;
  finalCost: number;
  imgs: string[];
  colors: string[];
  years: number[];
  sale: number;
  category: "Захист радіаторів" | "Захист двигуна" | "Інший захист";
  motorcycles: string[];
};