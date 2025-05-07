import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SearchComponent, TableComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
