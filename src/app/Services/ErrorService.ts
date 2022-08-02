import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ErrorService {
  errorHappened: Subject<string> = new Subject<string>();
  errorHandel = new Subject<boolean>();
  errorMsg: string = '';
}
