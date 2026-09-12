import { Component } from '@angular/core';
import { designTokens } from '@core/constants/design';
import { Button } from '@shared/ui/button/button';
import { SectionHeader } from '@shared/ui/section-header/section-header';
import { Tag } from '@shared/ui/tag/tag';
import { ThemeToggle } from '@core/layout/theme-toggle/theme-toggle';
import { AppIcon, type AppIconName } from '@shared/ui/icon/icon';
import { ProjectCard } from '@shared/components/project-card/project-card';
import { BlogCard } from '@shared/components/blog-card/blog-card';
import { TimelineItem } from '@shared/components/timeline-item/timeline-item';
import { GIT_WORKFLOW } from '@data/articles';

interface ColorEntry {
  name: string;
  value: string;
}

interface SpacingEntry {
  name: string;
  value: string;
}

/**
 * Internal style guide used to validate the design system while building.
 * Renders tokens and the full UI component library in one place. The theme
 * toggle and token swatches read the live runtime variables, so switching the
 * top-right toggle also updates this page.
 */
@Component({
  selector: 'app-design-system-page',
  imports: [Button, SectionHeader, Tag, ThemeToggle, AppIcon, ProjectCard, BlogCard, TimelineItem],
  template: `
    <div class="section container-custom space-y-24">
      <header>
        <p class="eyebrow">Internal · Architecture</p>
        <h1 class="display mt-4">Design System</h1>
        <p class="body-large mt-6 max-w-2xl text-secondary">
          Living style guide for validating tokens and UI primitives. Not part of the public site.
        </p>
      </header>

      <!-- Colors + theme -->
      <section class="space-y-8">
        <app-section-header
          eyebrow="Foundations"
          title="Color & Theme"
          description="Palette defined as runtime CSS variables — every token has a light and a dark value. Flip the toggle to see both."
        />
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          @for (color of colors(); track color.name) {
            <div class="overflow-hidden rounded-lg border border-border bg-surface shadow-card">
              <div class="h-24" [style.background-color]="color.value"></div>
              <div class="p-3">
                <p class="text-xs font-semibold text-primary">{{ color.name }}</p>
                <p class="text-xs text-secondary">{{ color.value }}</p>
              </div>
            </div>
          }
        </div>
        <div
          class="flex flex-col items-start gap-6 rounded-xl border border-border bg-surface p-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <p class="text-xs font-semibold uppercase tracking-widest text-secondary">
              Theme toggle
            </p>
            <p class="mt-2 text-sm text-secondary">
              System preference by default; manual override persists in localStorage. Applies before
              first paint (no flash), SSR-safe, keyboard accessible.
            </p>
          </div>
          <app-theme-toggle />
        </div>
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
          @for (token of liveTokens(); track token.name) {
            <div class="rounded-lg border border-border bg-surface p-4">
              <p class="text-xs font-semibold text-primary">{{ token.name }}</p>
              <p class="mt-1 text-[0.6875rem] text-secondary">{{ token.value }}</p>
            </div>
          }
        </div>
      </section>

      <!-- Elevation -->
      <section class="space-y-8">
        <app-section-header
          eyebrow="Foundations"
          title="Elevation"
          description="Soft, warm shadows on interactive surfaces. Never applied wholesale — borders + elevation work together."
        />
        <div class="grid gap-6 sm:grid-cols-3">
          <div class="rounded-xl border border-border bg-surface p-8">
            <p class="text-xs font-semibold uppercase tracking-widest text-secondary">
              shadow-card
            </p>
            <p class="mt-2 text-sm text-secondary">Cards, media, surfaces at rest</p>
          </div>
          <div class="rounded-xl border border-border bg-surface p-8 shadow-card">
            <p class="text-xs font-semibold text-primary">shadow-card</p>
            <p class="mt-2 text-sm text-secondary">Flagship + interactive surfaces</p>
          </div>
          <div class="rounded-xl border border-border bg-surface p-8 shadow-card-hover">
            <p class="text-xs font-semibold text-primary">shadow-card-hover</p>
            <p class="mt-2 text-sm text-secondary">Hover / keyboard focus</p>
          </div>
        </div>
      </section>

      <!-- Icons -->
      <section class="space-y-8">
        <app-section-header
          eyebrow="Components"
          title="Icons"
          description="Lucide-style set, consistent 1.6 stroke on a 24 grid, always currentColor."
        />
        <div class="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          @for (icon of icons(); track icon) {
            <div
              class="flex flex-col items-center gap-3 rounded-lg border border-border bg-surface p-5"
            >
              <app-icon [name]="icon" [size]="22" />
              <span class="text-xs font-medium text-secondary">{{ icon }}</span>
            </div>
          }
        </div>
      </section>

      <!-- Background atmosphere -->
      <section class="space-y-8">
        <app-section-header
          eyebrow="Environment"
          title="Background atmosphere"
          description="Mounted once in the app shell: faint trajectories + slow-moving points behind content. SVG/SMIL (no JS loop), pointer-events none, reduced-motion-safe, thinned on mobile."
        />
        <div
          class="flex aspect-[16/6] items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-background"
        >
          <p class="text-xs font-medium uppercase tracking-widest text-secondary">
            Live on every route — toggle the theme above to see both palettes
          </p>
        </div>
      </section>

      <!-- Typography -->
      <section class="space-y-8">
        <app-section-header
          eyebrow="Foundations"
          title="Typography"
          description="Cormorant Garamond for headings, Inter for body copy."
        />
        <div class="space-y-6">
          <div>
            <p class="text-xs uppercase tracking-widest text-secondary">display</p>
            <p class="display">Engineer. Builder. Explorer.</p>
          </div>
          <div>
            <p class="text-xs uppercase tracking-widest text-secondary">section-title</p>
            <p class="section-title">Selected work</p>
          </div>
          <div>
            <p class="text-xs uppercase tracking-widest text-secondary">eyebrow</p>
            <p class="eyebrow">Computer Engineering Student</p>
          </div>
          <div>
            <p class="text-xs uppercase tracking-widest text-secondary">body-large</p>
            <p class="body-large text-secondary">The quick brown fox jumps over the lazy dog.</p>
          </div>
          <div>
            <p class="text-xs uppercase tracking-widest text-secondary">body-medium</p>
            <p class="body-medium text-secondary">The quick brown fox jumps over the lazy dog.</p>
          </div>
          <div>
            <p class="text-xs uppercase tracking-widest text-secondary">body-small</p>
            <p class="body-small text-secondary">The quick brown fox jumps over the lazy dog.</p>
          </div>
        </div>
      </section>

      <!-- Buttons -->
      <section class="space-y-8">
        <app-section-header
          eyebrow="Components"
          title="Buttons"
          description="Primary and secondary variants across all sizes. Icons ride along and micro-shift on hover."
        />
        <div class="flex flex-col gap-6">
          <div class="flex flex-wrap items-center gap-4">
            <app-button>
              Primary
              <app-icon
                name="arrow-right"
                [size]="16"
                class="transition-transform duration-300 group-hover:translate-x-1"
              />
            </app-button>
            <app-button variant="secondary">Secondary</app-button>
            <app-button variant="secondary">
              External
              <app-icon name="external-link" [size]="16" />
            </app-button>
          </div>
          <div class="flex flex-wrap items-center gap-4">
            <app-button size="sm">Small</app-button>
            <app-button size="md">Medium</app-button>
            <app-button size="lg">Large</app-button>
          </div>
        </div>
      </section>

      <!-- Tags -->
      <section class="space-y-8">
        <app-section-header
          eyebrow="Components"
          title="Tags"
          description="Default and accent variants."
        />
        <div class="flex flex-wrap gap-3">
          <app-tag>TypeScript</app-tag>
          <app-tag>Angular</app-tag>
          <app-tag variant="accent">Featured</app-tag>
          <app-tag variant="accent">Open Source</app-tag>
        </div>
      </section>

      <!-- Cards -->
      <section class="space-y-8">
        <app-section-header
          eyebrow="Components"
          title="Cards"
          description="Project card structural frame. Hover lifts the card, deepens the shadow and scales media. Content renders when a Project is provided."
        />
        <div class="grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <app-project-card />
          <app-project-card />
          <app-project-card />
        </div>
      </section>

      <!-- Blog notes -->
      <section class="space-y-8">
        <app-section-header
          eyebrow="Components"
          title="Blog notes"
          description="Blog note card sharing the project card's resting frame, hover lift and focus-within behavior. Category, date, reading time and an access has the spotlight."
        />
        <div class="grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2">
          <app-blog-card [article]="sampleArticle()" />
          <app-blog-card [article]="sampleArticle()" />
        </div>
      </section>

      <!-- Timeline -->
      <section class="space-y-8">
        <app-section-header
          eyebrow="Components"
          title="Timeline"
          description="Timeline item structural rail. Content renders when an item is provided."
        />
        <div class="max-w-2xl space-y-10">
          <div class="group">
            <app-timeline-item />
          </div>
          <div class="group">
            <app-timeline-item />
          </div>
          <div class="group">
            <app-timeline-item [last]="true" />
          </div>
        </div>
      </section>

      <!-- Containers -->
      <section class="space-y-8">
        <app-section-header
          eyebrow="Layout"
          title="Containers"
          description="Width + padding primitives for the responsive layout system."
        />
        <div class="space-y-4">
          <div class="rounded-lg border border-dashed border-accent/40 p-4">
            <p class="text-xs font-medium text-secondary">container-custom (max 72rem)</p>
            <div class="container-custom mt-2 rounded-md bg-accent/10 px-2 py-6 text-center">
              <p class="text-xs font-medium text-accent">container-custom</p>
            </div>
          </div>
          <div class="rounded-lg border border-dashed border-accent/40 p-4">
            <p class="text-xs font-medium text-secondary">container-narrow (max 46rem)</p>
            <div class="container-narrow mt-2 rounded-md bg-accent/10 px-2 py-6 text-center">
              <p class="text-xs font-medium text-accent">container-narrow</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Spacing -->
      <section class="space-y-8 pb-24">
        <app-section-header
          eyebrow="Layout"
          title="Spacing"
          description="Named tokens driving vertical rhythm and component gaps."
        />
        <div class="space-y-3">
          @for (step of spacing(); track step.name) {
            <div class="flex items-center gap-4">
              <p class="w-16 shrink-0 text-xs font-medium text-secondary">
                {{ step.name }}
              </p>
              <div class="h-5 rounded-sm bg-accent/70" [style.width]="step.value"></div>
              <p class="text-xs text-secondary">{{ step.value }}</p>
            </div>
          }
        </div>
      </section>
    </div>
  `,
})
export class DesignSystemPage {
  private readonly ICONS: AppIconName[] = [
    'github',
    'linkedin',
    'mail',
    'arrow-left',
    'arrow-right',
    'arrow-up-right',
    'external-link',
    'sun',
    'moon',
    'menu',
    'x',
    'map-pin',
    'calendar',
    'clock',
    'code',
  ];

  protected readonly icons = (): AppIconName[] => this.ICONS;

  protected readonly sampleArticle = () => GIT_WORKFLOW;

  protected readonly colors = (): ColorEntry[] => {
    const color = designTokens.color;
    return Object.entries(color).map(([name, value]) => ({ name, value }));
  };

  protected readonly liveTokens = (): Array<{ name: string; value: string }> => {
    const names = [
      '--background',
      '--surface',
      '--primary',
      '--secondary',
      '--border',
      '--accent',
      '--accent-hover',
      '--elevation-card',
    ];
    if (typeof document === 'undefined') {
      return names.map((name) => ({ name, value: '' }));
    }
    return names.map((name) => ({
      name,
      value: getComputedStyle(document.documentElement).getPropertyValue(name).trim().slice(0, 44),
    }));
  };

  protected readonly spacing = (): SpacingEntry[] =>
    Object.entries(designTokens.spacing).map(([name, value]) => ({
      name,
      value,
    }));
}
