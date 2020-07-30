import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainViewComponent } from './pages/main-view/main-view.component';
import {
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { MainViewService } from './pages/main-view/main-view.service';

@NgModule({
  declarations: [AppComponent, MainViewComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, DragDropModule],
  providers: [MainViewService],
  bootstrap: [AppComponent],
})
export class AppModule {}
