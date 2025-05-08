import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  isShowed$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  show(): void {
    this.isShowed$.next(true);
  }

  hide(): void {
    this.isShowed$.next(false);
  }
}
