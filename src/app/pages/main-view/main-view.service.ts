import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BoardStructure } from 'src/app/interfaces/board-structure';
import { CardStructure } from 'src/app/interfaces/card-structure';

@Injectable({
  providedIn: 'root'
})
export class MainViewService {

  constructor(private http: HttpClient) { }

  getBoard() : Observable<BoardStructure> {
    return this.http.get<BoardStructure>('http://localhost:8081/boards/1');
  }

  getCardByColumn(cardListId: number) : Observable<CardStructure[]> {
    return this.http.get<CardStructure[]>(`http://localhost:8081/cards?cardListId=${cardListId}`);
  }

  moveCardToColumn(cardId: number, newColumndId: number): void {
    this.http.patch(`http://localhost:8081/cards/${cardId}`, {
      newColumndId: newColumndId
    }).subscribe();
  }

}
