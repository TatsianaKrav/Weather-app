import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  protected readonly searchControl = new FormControl('');

  constructor() {

  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => console.log(value))
  }
}

