import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { CreateNoteDialogComponent } from './create-note-dialog/create-note-dialog.component';
import { CustomLayoutsComponent } from './custom-layouts/custom-layouts.component';
import { MenuComponent } from './menu/menu.component';
import { SidenavMenuComponent } from './sidenav-menu/sidenav-menu.component';
import { TemplatesComponent } from './templates/templates.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NoteListComponent } from './note-list/note-list.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SidenavMenuComponent,
    ToolbarComponent,
    CanvasComponent,
    CustomLayoutsComponent,
    TemplatesComponent,
    CreateNoteDialogComponent,
    NoteListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    MatGridListModule,
    MatCardModule,
    DragDropModule,
    MatFormFieldModule,
    MatSelectModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
