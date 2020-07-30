import { Column } from '../models/column.model'

export interface BoardStructure {
  id: number,
  name: string,
  description: string,
  cardLists: Column[]
}