import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ErrorService } from '../Services/ErrorService';
import { Router } from '@angular/router';

@Injectable()
export class ToHandleErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.router.navigate(['/Not-found']);
        } else {
          this.errorService.errorHappened.next(error.name);
        }
        return throwError(error);
      })
    );
  }
}
