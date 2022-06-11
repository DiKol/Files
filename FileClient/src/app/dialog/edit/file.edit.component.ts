import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FileModel } from 'src/app/model/file.model';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'file.edit.dialog',
  templateUrl: './file.edit.component.html',
  styleUrls: ['./file.edit.component.scss']
})

export class FileEditComponent implements OnInit {

  title = '';
  formControl = new FormControl('', [Validators.required]);
  editMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<FileEditComponent>,
    @Inject(MAT_DIALOG_DATA) public file: FileModel,
    private service: FileService
    )
    { }

  ngOnInit() {
    this.title = 'File';
    if(this.file.name)
    {
      this.editMode = true;
      this.service.getFile(this.file.name).subscribe(x=>this.file.content = x);
    }
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  close(): void {
    this.dialogRef.close();
  }

  public edit(): void {
    if (this.editMode) {
      this.service.updateFile(this.file).subscribe(_=> {this.dialogRef.close();});
    } else {
      this.service.addFile(this.file).subscribe(_=> {this.dialogRef.close();});
    }
  }
}
