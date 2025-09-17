import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar color="primary">
      <button mat-button routerLink="/" style="display: flex; align-items: center; gap: 8px;">
        <img src="/assets/logo.svg" alt="logo" height="32" />
        <span>FirstApp</span>
      </button>
      <span class="spacer"></span>
      <button mat-icon-button aria-label="Home" routerLink="/">
        <mat-icon>home</mat-icon>
      </button>
    </mat-toolbar>
    <div class="layout-content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .layout-content { padding: 16px; max-width: 1100px; margin: 0 auto; }
    .spacer { flex: 1 1 auto; }
  `]
})
export class MainLayout {}
