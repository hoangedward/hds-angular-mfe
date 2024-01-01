import { AdminAuthGuard } from '@micro-app/app-store';
import { Routes } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './home-page/home-page.component';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/sign-in' },
  {
    path: '',
    children: [
        {
          path: 'sign-in',
          loadChildren: () => import('user-management/Signin'),
        },
    ]
},
  {
    path: 'user-management',
    // loadChildren: () => import('user-management/Routes').then((m) => m.remoteRoutes),
    loadChildren: () =>
      loadRemoteModule('user-management', './Routes').then(
        (m) => m.remoteRoutes
      ),
    canActivate: [AdminAuthGuard],
    canLoad: [AdminAuthGuard],
  },
  {
    path: 'product',
    loadChildren: () => import('product/Routes').then((m) => m.remoteRoutes),
    canActivate: [AdminAuthGuard],
    canLoad: [AdminAuthGuard],
  },
  {
    path: 'home',
    // loadChildren: () => import('product/Routes').then((m) => m.remoteRoutes),
    component: HomePageComponent,
    canActivate: [AdminAuthGuard],
    canLoad: [AdminAuthGuard],
  },
  {
    path: 'cart',
    loadChildren: () => import('cart/Routes').then((m) => m.remoteRoutes),
    canActivate: [AdminAuthGuard],
    canLoad: [AdminAuthGuard],
  },
  {
    path: 'shop',
    loadChildren: () => import('shop/Routes').then((m) => m.remoteRoutes),
    canActivate: [AdminAuthGuard],
    canLoad: [AdminAuthGuard],
  },
];
