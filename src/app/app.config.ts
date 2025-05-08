import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { API_KEY, BASE_API_URL_TOKEN } from '../environments/environment.token';
import { httpInterceptor } from './core/interceptors/http.interceptor';
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    {
      provide: BASE_API_URL_TOKEN,
      useValue: environment.baseApiUrl,
    },
    {
      provide: API_KEY,
      useValue: environment.apiKey,
    },
  ],
};
