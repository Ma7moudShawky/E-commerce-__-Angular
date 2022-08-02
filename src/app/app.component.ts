import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorService } from './Services/ErrorService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  errorSubscribtion: Subscription;
  errorHandelSubscribtion: Subscription;

  errorHappened: boolean = false;

  constructor(private errorService: ErrorService) {}

  ngOnDestroy(): void {
    this.errorSubscribtion.unsubscribe();
    this.errorHandelSubscribtion.unsubscribe();
  }

  ngOnInit(): void {
    this.errorSubscribtion = this.errorService.errorHappened.subscribe(
      (msg) => {
        this.errorHappened = true;
        this.errorService.errorMsg = msg;
      }
    );
    this.errorHandelSubscribtion = this.errorService.errorHandel.subscribe(
      () => {
        this.errorHappened = false;
      }
    );
  }
}
