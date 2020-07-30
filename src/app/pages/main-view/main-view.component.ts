import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { Card } from '../../models/card.model';
import { MainViewService } from './main-view.service';
import { CardStructure } from 'src/app/interfaces/card-structure';
import { BoardStructure } from 'src/app/interfaces/board-structure';
import { Subject } from 'rxjs';
import { takeUntil, map, mergeMap, switchMap } from 'rxjs/operators';
import { ColumnStructure } from 'src/app/interfaces/column-structure';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  board: BoardStructure;

  constructor(private mainViewService: MainViewService) {}

  ngOnInit(): void {
    this.setBoardAndColumns();
  }

  drop(event: CdkDragDrop<string[]>, newColumnId: number) {
    this.moveOnArrays(event);
    this.moveCardToColumn(event.item.data.id, newColumnId);
  }

  private moveCardToColumn(currentColumnId: number, newColumnId: number): void {
    this.mainViewService.moveCardToColumn(currentColumnId, newColumnId);
  }

  private moveOnArrays(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  private setBoardAndColumns() {
    this.mainViewService
      .getBoard()
      .pipe(
        takeUntil(this.unsubscribe$),
        map(
          (resBoard) =>
            new Board(
              resBoard.id,
              resBoard.name,
              resBoard.description,
              this.setColumns(resBoard.cardLists)
            )
        )
      )
      .subscribe((board) => {
        this.board = board;
        this.board.cardLists.forEach(column => this.setCardsByColumnId(column))
      });
  }

  private setColumns(resLists: ColumnStructure[]) {
    return resLists.map((column) => new Column(column.id, column.name, []));
  }

  private setCardsByColumnId(column: ColumnStructure): void {
    this.mainViewService
      .getCardByColumn(column.id)
      .subscribe(resTasks => column.tasks = resTasks);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
