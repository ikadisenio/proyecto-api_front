import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';

import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { appRoutes } from './app/app.routes';

bootstrapApplication(App, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient()
  ]
});
