import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { FileModel } from '../model/file.model';
import { api, DataServiceError, fakeDelays } from './config';


@Injectable()
export class FileService {
  constructor(private http: HttpClient) { }

  addFile(file: FileModel): Observable<FileModel> {
    return this.http.post<FileModel>(`${api}/file`, file).pipe(
      delay(fakeDelays.save),
      catchError(this.handleError(file))
    );
  }

  deleteFile(file: FileModel): Observable<FileModel> {
    return this.http.delete<FileModel>(`${api}/file/${file.name}`).pipe(
      delay(fakeDelays.save),
      catchError(this.handleError())
    );
  }

  getFiles(): Observable<FileModel[]> {
    return this.http.get<Array<FileModel>>(`${api}/file`).pipe(
      delay(fakeDelays.select),
      catchError(this.handleError())
    );
  }

  getFile(name : string): Observable<string > {
    return this.http.get(`${api}/file/${name}`, { responseType: 'text'}).pipe(
      delay(fakeDelays.select),
      catchError(this.handleError())
    );
  }

  updateFile(file: FileModel): Observable<FileModel> {
    return this.http.put<FileModel>(`${api}/file`, file).pipe(
      delay(fakeDelays.save),
      map(() => file),
      catchError(this.handleError(file))
    );
  }

  private handleError<T>(requestData?: T) {
    return (res: HttpErrorResponse) => {
      const error = new DataServiceError(res.error, requestData);
      console.error(error);
      return throwError(error);
    };
  }
}
