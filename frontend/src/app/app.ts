import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard.component/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterOutlet,
    DashboardComponent
  ],
  template: `<router-outlet></router-outlet>`,
})
export class App {
  protected readonly title = signal('frontend');
}
