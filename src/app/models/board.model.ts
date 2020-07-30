import { Column } from './column.model';
import { BoardStructure } from '../interfaces/board-structure';

export class Board implements BoardStructure {
  constructor(public id: number, public name: string, public description: string, public cardLists: Column[]) {}
}
