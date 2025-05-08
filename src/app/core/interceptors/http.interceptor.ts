import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, finalize } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
import { inject } from '@angular/core';
import { ErrorService } from '../../shared/services/error.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  const errorService = inject(ErrorService);
  loaderService.show();

  return next(req).pipe(
    catchError((error) => {
      error ? errorService.show() : errorService.hide();
      return [];
    }),
    finalize(() => loaderService.hide())
  );
};
