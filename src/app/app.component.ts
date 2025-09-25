import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <div class="app-container">
      <!-- Header moderno com glassmorphism -->
      <header class="header">
        <div class="header-content">
          <div class="logo-section">
            <div class="logo" routerLink="/">
              <div class="logo-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 11h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 16h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8 11h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="logo-text">
                <h1 class="logo-title">Consultório</h1>
                <span class="logo-subtitle">Gestão de Pessoas</span>
              </div>
            </div>
          </div>

          <nav class="nav">
            <a routerLink="/" 
               routerLinkActive="nav-active" 
               [routerLinkActiveOptions]="{exact: true}"
               class="nav-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Pessoas</span>
            </a>
            
            <a routerLink="/criar" 
               routerLinkActive="nav-active" 
               class="nav-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="m19 8 2 2-2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="m21 10-7.5 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Nova Pessoa</span>
            </a>
          </nav>

          <!-- Mobile menu button -->
          <button class="mobile-menu-btn" (click)="toggleMobileMenu()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="m3 12 2-2m0 0 7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11 2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <!-- Mobile navigation -->
        <div class="mobile-nav" [class.mobile-nav-open]="mobileMenuOpen">
          <a routerLink="/" 
             routerLinkActive="nav-active" 
             [routerLinkActiveOptions]="{exact: true}"
             class="mobile-nav-link"
             (click)="closeMobileMenu()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Lista de Pessoas</span>
          </a>
          
          <a routerLink="/criar" 
             routerLinkActive="nav-active" 
             class="mobile-nav-link"
             (click)="closeMobileMenu()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="m19 8 2 2-2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="m21 10-7.5 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Cadastrar Pessoa</span>
          </a>
        </div>
      </header>

      <!-- Main content com animação -->
      <main class="main-content animate-fade-in-up">
        <router-outlet></router-outlet>
      </main>

      <!-- Footer moderno -->
      <footer class="footer">
        <div class="footer-content">
          <div class="footer-info">
            <p>&copy; 2024 Sistema de Consultório</p>
            <div class="footer-tech">
              <span class="tech-badge">Angular 19</span>
              <span class="tech-badge">Spring Boot</span>
              <span class="tech-badge">Modern UI</span>
            </div>
          </div>
          <div class="footer-links">
            <span class="footer-heart">Feito com ❤️</span>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    /* Header moderno */
    .header {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 80px;
    }

    /* Logo moderno */
    .logo {
      display: flex;
      align-items: center;
      gap: 1rem;
      text-decoration: none;
      color: white;
      cursor: pointer;
      transition: var(--transition-all);
    }

    .logo:hover {
      transform: translateY(-2px);
    }

    .logo-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1));
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.3);
    }

    .logo-text {
      display: flex;
      flex-direction: column;
    }

    .logo-title {
      font-size: 1.5rem;
      font-weight: 700;
      line-height: 1.2;
      margin: 0;
    }

    .logo-subtitle {
      font-size: 0.75rem;
      opacity: 0.8;
      font-weight: 400;
    }

    /* Navegação moderna */
    .nav {
      display: flex;
      gap: 0.5rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      border-radius: 12px;
      font-weight: 500;
      font-size: 0.875rem;
      transition: var(--transition-all);
      backdrop-filter: blur(10px);
      border: 1px solid transparent;
      position: relative;
    }

    .nav-link:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }

    .nav-link.nav-active {
      background: rgba(255, 255, 255, 0.95);
      color: #4f46e5;
      font-weight: 600;
      border-color: rgba(255, 255, 255, 0.3);
      box-shadow: 0 4px 15px 0 rgba(31, 38, 135, 0.2);
    }

    /* Mobile menu */
    .mobile-menu-btn {
      display: none;
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 8px;
      transition: var(--transition-all);
    }

    .mobile-menu-btn:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .mobile-nav {
      display: none;
      flex-direction: column;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding: 1rem;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }

    .mobile-nav.mobile-nav-open {
      max-height: 200px;
    }

    .mobile-nav-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.875rem 1rem;
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      border-radius: 8px;
      font-weight: 500;
      transition: var(--transition-all);
      margin-bottom: 0.5rem;
    }

    .mobile-nav-link:hover,
    .mobile-nav-link.nav-active {
      background: rgba(255, 255, 255, 0.15);
      color: white;
    }

    /* Main content */
    .main-content {
      flex: 1;
      padding: 3rem 0;
      min-height: calc(100vh - 200px);
    }

    /* Footer moderno */
    .footer {
      background: rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(20px);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      margin-top: auto;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: rgba(255, 255, 255, 0.8);
    }

    .footer-info {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .footer-info p {
      margin: 0;
      font-weight: 500;
    }

    .footer-tech {
      display: flex;
      gap: 0.5rem;
    }

    .tech-badge {
      background: rgba(255, 255, 255, 0.1);
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 500;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .footer-heart {
      font-size: 0.875rem;
      opacity: 0.8;
    }

    /* Responsividade */
    @media (max-width: 768px) {
      .header-content {
        padding: 0 1rem;
      }

      .nav {
        display: none;
      }

      .mobile-menu-btn {
        display: block;
      }

      .mobile-nav {
        display: flex;
      }

      .logo-title {
        font-size: 1.25rem;
      }

      .logo-subtitle {
        font-size: 0.6rem;
      }

      .main-content {
        padding: 1.5rem 0;
      }

      .footer-content {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
        padding: 1.5rem;
      }

      .footer-tech {
        justify-content: center;
      }
    }

    @media (max-width: 480px) {
      .header-content {
        min-height: 70px;
      }

      .logo-icon {
        width: 40px;
        height: 40px;
      }

      .logo-title {
        font-size: 1.1rem;
      }

      .tech-badge {
        font-size: 0.6rem;
        padding: 0.2rem 0.5rem;
      }
    }
  `]
})
export class AppComponent {
  title = 'consultorio-frontend';
  mobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}