import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  isShowed$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  show(): void {
    this.isShowed$.next(true);
  }

  hide(): void {
    this.isShowed$.next(false);
  }
}
