import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { CitySearchService } from '../../services/city-search.service';
import { CityInfoResponse } from '../../models/city-info-response';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  protected readonly searchControl = new FormControl('');
  dropdownOptions: string[] = [];

  constructor(private citySearchService: CitySearchService) {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => {
        if (value) {
          this.citySearchService.getWeatherByCity(value).subscribe(data => {
            this.dropdownOptions = data.map(cityObj => cityObj.name);
          })
        }
      })
  }


}

