import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { FusionAuthModule } from '@fusionauth/angular-sdk';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    provideRouter(routes),
    importProvidersFrom(
      FusionAuthModule.forRoot({
        clientId: 'e9fdb985-9173-4e01-9d73-ac2d60d1dc8e',
        serverUrl: 'http://localhost:9011',
        redirectUri: 'http://localhost:4200',
        scope: 'openid email profile offline_access',
        shouldAutoRefresh: true,
      }),
    ),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
  ],
};
