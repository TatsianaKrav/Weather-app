import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { API_KEY, BASE_API_URL_TOKEN } from '../environments/environment.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
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
