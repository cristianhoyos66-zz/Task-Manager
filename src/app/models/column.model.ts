import { ColumnStructure } from '../interfaces/column-structure';
import { CardStructure } from '../interfaces/card-structure';

export class Column implements ColumnStructure {
  constructor(public id: number, public name: string, public tasks: CardStructure[]) {}
}
