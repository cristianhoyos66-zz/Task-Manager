import { CardStructure } from './card-structure';

export interface ColumnStructure {
  id: number,
  name: string,
  tasks: CardStructure[]
}