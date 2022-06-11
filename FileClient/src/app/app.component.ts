import { FileModel } from './model/file.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FileService } from './services/file.service';
import { MatDialog } from '@angular/material/dialog';
import { FileEditComponent } from './dialog/edit/file.edit.component';
import { FileDeleteComponent } from './dialog/delete/file.delete.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name: string;
  content: string;
  file: FileModel;
  files: FileModel[] = [];
  response: {};

  constructor(private http: HttpClient, private service: FileService, public dialogService: MatDialog) { }

  ngOnInit() {
    this.getFiles();
  }

  create = () => {
    this.file = {
      name: this.name,
      content: this.content,
      size: 0
    }

    let dialogRef = this.dialogService.open(FileEditComponent, { data: {} });
    dialogRef.afterClosed().subscribe(_ => { this.getFiles(); });
  }


  delete = (file : FileModel) => {
    let dialogRef = this.dialogService.open(FileDeleteComponent, { data: file });
    dialogRef.afterClosed().subscribe(_ => { this.getFiles(); });
  }


  update = (file : FileModel) => {
    let dialogRef = this.dialogService.open(FileEditComponent, { data: file });
    dialogRef.afterClosed().subscribe(_ => { this.getFiles(); });
  }

  private getFiles = () => {
    this.service.getFiles().subscribe(items => { this.files = items; });
  }


  uploadFinished = (event) => {
    this.response = event;
  }
}
