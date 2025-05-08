import { Component, ElementRef, input, viewChild } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  readonly options = input<string[]>();
  menu = viewChild<ElementRef<HTMLElement>>('menu');

  handleOption(): void {
    this.menu()?.nativeElement.classList.remove('active');
  }
}
