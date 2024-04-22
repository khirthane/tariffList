import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppIntl } from '../../../assets/i10n/app.intl';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="bg-white h-20 shadow-md">
      <div class="max-w-screen-xl mx-auto flex p-5">
        <span (click)="goToHomePage()" class="cursor-pointer">
          <img src="/assets/images/logo.svg" width="150" />
        </span>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  intl = inject(AppIntl);
  router = inject(Router);

  goToHomePage() {
    this.router.navigate(['/']);
  }
}
