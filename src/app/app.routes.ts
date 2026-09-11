import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Home',
    loadComponent: () => import('@features/home/home-page').then((m) => m.HomePage),
  },
  {
    path: 'about',
    title: 'About',
    loadComponent: () => import('@features/about/about-page').then((m) => m.AboutPage),
  },
  {
    path: 'projects',
    title: 'Projects',
    loadComponent: () => import('@features/projects/projects-page').then((m) => m.ProjectsPage),
  },
  {
    path: 'projects/:slug',
    title: 'Project',
    loadComponent: () =>
      import('@features/projects/project-detail-page').then((m) => m.ProjectDetailPage),
  },
  {
    path: 'experience',
    title: 'Experience',
    loadComponent: () =>
      import('@features/experience/experience-page').then((m) => m.ExperiencePage),
  },
  {
    path: 'blog',
    title: 'Blogs',
    loadComponent: () => import('@features/blog/blog-page').then((m) => m.BlogPage),
  },
  {
    path: 'blog/:slug',
    title: 'Note',
    loadComponent: () => import('@features/blog/article-page').then((m) => m.ArticlePage),
  },
  {
    path: 'contact',
    title: 'Contact',
    loadComponent: () => import('@features/contact/contact-page').then((m) => m.ContactPage),
  },
  {
    path: 'design-system',
    title: 'Design System',
    loadComponent: () =>
      import('@features/design-system/design-system-page').then((m) => m.DesignSystemPage),
  },
  { path: '**', redirectTo: '' },
];
