import { Component, inject } from '@angular/core';
import { FusionAuthService } from '@fusionauth/angular-sdk';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  private fusionAuthService = inject(FusionAuthService);

  login() {
    this.fusionAuthService.startLogin();
  }
  register() {
    this.fusionAuthService.startRegistration();
  }
}
