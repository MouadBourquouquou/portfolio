import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FeaturedProject } from '@shared/components/featured-project/featured-project';
import { ProjectCard } from '@shared/components/project-card/project-card';
import { SectionHeader } from '@shared/ui/section-header/section-header';
import { AppIcon } from '@shared/ui/icon/icon';
import { PROJECTS } from '@data/projects';
import { LanguageService } from '@core/services/language/language.service';

@Component({
  selector: 'app-selected-work-section',
  imports: [RouterLink, SectionHeader, FeaturedProject, ProjectCard, AppIcon],
  template: `
    <section
      id="work"
      class="section section-lg container-custom border-t border-border"
      aria-labelledby="work-heading"
    >
      <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <app-section-header
          size="lg"
          [eyebrow]="i18n.read('work.eyebrow')"
          [title]="i18n.read('work.title')"
          [description]="i18n.read('work.description')"
        />
        <a
          [routerLink]="['/projects']"
          class="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
        >
          {{ i18n.read('work.viewAll') }}
          <app-icon
            name="arrow-right"
            [size]="16"
            class="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </div>

      <div class="mt-16">
        @if (featured(); as project) {
          <app-featured-project [project]="project" />
        }
      </div>

      @if (supporting().length) {
        <div class="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          @for (project of supporting(); track project.slug) {
            <app-project-card [project]="project" />
          }
        </div>
      }
    </section>
  `,
})
export class SelectedWorkSection {
  protected readonly i18n = inject(LanguageService);

  protected readonly featured = computed(() => {
    const project = this.projects.find((item) => item.featured);
    return project ? this.localize(project) : null;
  });

  protected readonly supporting = computed(() =>
    this.projects
      .filter((project) => !project.featured)
      .slice(0, 3)
      .map((project) => this.localize(project)),
  );

  private readonly projects = PROJECTS;

  private localize(project: (typeof PROJECTS)[number]) {
    return this.i18n.project(project) ?? project;
  }
}
