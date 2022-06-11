import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/material.module';
import { FormsModule } from '@angular/forms';
import { FileEditComponent } from './edit/file.edit.component';
import { FileDeleteComponent } from './delete/file.delete.component';

@NgModule({
  declarations: [
    FileEditComponent,
    FileDeleteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule

  ],
  exports: [
    FileEditComponent,
    FileDeleteComponent
  ]
})

export class DialogModule { }
