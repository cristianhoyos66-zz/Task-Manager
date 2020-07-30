import { CardStructure } from '../interfaces/card-structure';

export class Card implements CardStructure {
  constructor(public id: number, public name: string, public description: string) {}
}
