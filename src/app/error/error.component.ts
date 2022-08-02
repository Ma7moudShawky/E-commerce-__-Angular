import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorService } from '../Services/ErrorService';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit, OnDestroy {
  routerSubscribtion: Subscription;

  constructor(private errorService: ErrorService, private route: Router) {}

  ngOnDestroy(): void {
    this.routerSubscribtion.unsubscribe();
  }
  errorMsg: string = '';
  ngOnInit(): void {
    this.errorMsg = this.errorService.errorMsg;
    this.routerSubscribtion = this.route.events.subscribe(() => {
      this.errorService.errorHandel.next(true);
    });
  }
  onHandleError() {
    this.errorService.errorHandel.next(true);
    location.reload();
  }
}
