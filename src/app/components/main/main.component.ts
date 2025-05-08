import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { TableComponent } from '../table/table.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoaderService } from '../../services/loader.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ErrorService } from '../../shared/services/error.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    SearchComponent,
    TableComponent,
    ProgressSpinnerModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  constructor(
    public loaderService: LoaderService,
    public errorService: ErrorService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.errorService.isShowed$.subscribe((value) => {
      if (value) {
        this.showInfo();
      }
    });
  }

  showInfo(): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Request failed',
    });
  }
}
