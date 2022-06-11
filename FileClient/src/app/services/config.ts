import { environment } from 'src/environments/environment';

export const api = environment.api;
export const fakeDelays = { select: 1000, save: 200 };

export class DataServiceError<T> {
  constructor(public error: any, public requestData: T) { }
}
