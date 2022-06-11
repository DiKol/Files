import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FileModel } from 'src/app/model/file.model';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'file.delete.dialog',
  templateUrl: './file.delete.component.html',
  styleUrls: ['./file.delete.component.scss']
})

export class FileDeleteComponent implements OnInit {

  title = '';
  constructor(
    public dialogRef: MatDialogRef<FileDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public file: FileModel,
    private service: FileService
    )
    { }

  ngOnInit() {
    this.title = 'Delete File';
  }

  close(): void {
    this.dialogRef.close();
  }

  public delete(): void {
      this.service.deleteFile(this.file).subscribe();
  }
}
