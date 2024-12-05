export interface BoardField {
  id: number;
  label: number;
  link: string;
  color: string;
  position: { x: number, y: number };
  completed: boolean;  // Új tulajdonság hozzáadva
}