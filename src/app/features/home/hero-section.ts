import { AfterViewInit, Component, ElementRef, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Button } from '@shared/ui/button/button';
import { AnimationService } from '@core/services/animation/animation.service';
import { LanguageService } from '@core/services/language/language.service';
import { SITE } from '@core/constants/site.constants';
import { CvService } from '@core/services/cv/cv.service';
import { AppIcon } from '@shared/ui/icon/icon';
import { Tag } from '@shared/ui/tag/tag';
import { PROJECTS } from '@data/projects';
import { EXPERIENCE } from '@data/experience';
import { SKILLS } from '@data/skills';

const HERO_STATS = [
  { value: String(PROJECTS.length).padStart(2, '0'), labelKey: 'stats.projects' },
  { value: String(EXPERIENCE.length).padStart(2, '0'), labelKey: 'stats.experiences' },
  { value: String(SKILLS.length).padStart(2, '0'), labelKey: 'stats.skills' },
];

/**
 * Profile slot. Real assets are expected at `public/images/profile/portrait.png`.
 * If the photo is missing the image errors out and the component falls back to
 * the typographic placeholder — no broken-image frame is ever shown.
 */
const PROFILE = {
  location: 'Marrakech, Morocco',
  photo: '/images/profile/portrait.png',
  photoAlt: 'Portrait of Mouad Bourquouquou',
  phone: '+212 7 10461852',
  phoneFallback: '—',
  focus: ['Angular', 'Spring Boot', 'Python', 'AI / Data', 'Docker', 'Cloudflare'],
};

const PROFILE_PATH_1 = 'M24 90 C 150 70, 300 120, 500 84';
const PROFILE_PATH_2 = 'M18 190 C 150 170, 330 210, 502 250';
const PROFILE_PATH_3 = 'M-6 330 C 170 350, 330 300, 520 360';

@Component({
  selector: 'app-hero-section',
  imports: [Button, AppIcon, Tag],
  template: `
    <section
      class="section container-custom pt-[clamp(4rem,10vw,7.5rem)]"
      aria-labelledby="hero-heading"
    >
      <div class="grid items-center gap-16 lg:grid-cols-12 lg:gap-12 xl:gap-16">
        <!-- Editorial column -->
        <div class="lg:col-span-7">
          <p class="flex items-center gap-3" data-hero-reveal>
            <span class="inline-block h-px w-10 bg-accent" aria-hidden="true"></span>
            <span class="hero-status inline-block size-1.5" aria-hidden="true"></span>
            <span class="eyebrow">{{ i18n.read('hero.eyebrow') }}</span>
          </p>

          <h1 id="hero-heading" class="hero-title mt-7" data-hero-reveal>
            {{ i18n.read('hero.titleLine1') }}<br />{{ i18n.read('hero.titleLine2') }}
          </h1>

          <p
            class="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-secondary sm:text-sm sm:tracking-[0.18em]"
            data-hero-reveal
          >
            <span>{{ i18n.read('hero.fieldFullStack') }}</span>
            <span class="mx-2 opacity-50" aria-hidden="true">·</span>
            <span>{{ i18n.read('hero.fieldAiData') }}</span>
            <span class="mx-2 opacity-50" aria-hidden="true">·</span>
            <span>{{ i18n.read('hero.fieldCloudDevOps') }}</span>
          </p>

          <p class="body-large mt-7 max-w-xl text-secondary" data-hero-reveal>
            {{ i18n.read('hero.intro') }}
          </p>

          <div
            class="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            data-hero-reveal
          >
            <app-button size="lg" [href]="'#work'" [external]="false" class="w-full sm:w-auto">
              {{ i18n.read('hero.exploreProjects') }}
              <app-icon
                name="arrow-right"
                [size]="17"
                class="transition-transform duration-300 group-hover:translate-x-1"
              />
            </app-button>
            <app-button size="lg" variant="secondary" route="/contact" class="w-full sm:w-auto">
              {{ i18n.read('hero.getInTouch') }}
            </app-button>
            @if (cvAvailable()) {
              <app-button
                size="lg"
                variant="secondary"
                [href]="cvUrl"
                [download]="cvFileName"
                [external]="false"
                [ariaLabel]="i18n.read('common.downloadCv')"
                (click)="onDownloadCv($event)"
                class="w-full sm:w-auto"
              >
                {{ i18n.read('common.downloadCv') }}
                <app-icon name="download" [size]="17" />
              </app-button>
            }
          </div>

          <div class="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3" data-hero-reveal>
            <a
              [href]="github"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex items-center gap-2 text-sm font-medium text-secondary transition-colors hover:text-accent"
            >
              <app-icon name="github" [size]="17" />
              GitHub
              <app-icon
                name="arrow-up-right"
                [size]="14"
                class="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              [href]="linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex items-center gap-2 text-sm font-medium text-secondary transition-colors hover:text-accent"
            >
              <app-icon name="linkedin" [size]="17" />
              LinkedIn
              <app-icon
                name="arrow-up-right"
                [size]="14"
                class="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              [href]="'mailto:' + email"
              class="group inline-flex items-center gap-2 text-sm font-medium text-secondary transition-colors hover:text-accent"
            >
              <app-icon name="mail" [size]="17" />
              {{ i18n.read('hero.email') }}
              <app-icon
                name="arrow-up-right"
                [size]="14"
                class="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          <div class="mt-14 max-w-md" data-hero-reveal>
            <dl class="grid grid-cols-3">
              @for (stat of stats; track stat.labelKey) {
                <div
                  class="flex flex-col-reverse border-s border-border px-6 first:border-s-0 first:ps-0 last:pe-0"
                >
                  <dt class="mt-1 text-xs uppercase tracking-[0.13em] text-secondary">
                    {{ i18n.read(stat.labelKey) }}
                  </dt>
                  <dd
                    class="font-heading text-4xl font-medium tracking-tight tabular-nums text-primary md:text-5xl"
                  >
                    {{ stat.value }}
                  </dd>
                </div>
              }
            </dl>
          </div>
        </div>

        <!-- Personal profile composition -->
        <div class="lg:col-span-5" data-hero-reveal>
          <figure class="mx-auto w-full max-w-[368px]">
            <div
              class="relative overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-card"
            >
              <div class="media-texture absolute inset-0" aria-hidden="true"></div>

              <svg
                viewBox="0 0 520 680"
                preserveAspectRatio="xMidYMid slice"
                class="absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                <g class="opacity-70">
                  <g class="hero-line">
                    <path [attr.d]="profilePath1" />
                    <path [attr.d]="profilePath2" />
                    <path [attr.d]="profilePath3" />
                  </g>

                  <g class="hero-node">
                    <circle cx="24" cy="90" r="2.5" />
                    <circle cx="18" cy="190" r="2.5" />
                    <circle cx="-6" cy="330" r="2.5" />
                  </g>

                  <g>
                    <circle r="3" class="hero-dot-accent">
                      <animateMotion
                        dur="14s"
                        repeatCount="indefinite"
                        begin="0.6s"
                        [attr.path]="profilePath1"
                      />
                      <animate
                        attributeName="opacity"
                        values="0;0.8;0.8;0"
                        keyTimes="0;0.12;0.88;1"
                        dur="14s"
                        begin="0.6s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle r="3" class="hero-dot-soft">
                      <animateMotion
                        dur="18s"
                        repeatCount="indefinite"
                        begin="1.8s"
                        [attr.path]="profilePath2"
                      />
                      <animate
                        attributeName="opacity"
                        values="0;0.7;0.7;0"
                        keyTimes="0;0.12;0.88;1"
                        dur="18s"
                        begin="1.8s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle r="3" class="hero-dot-accent">
                      <animateMotion
                        dur="22s"
                        repeatCount="indefinite"
                        begin="2.6s"
                        [attr.path]="profilePath3"
                      />
                      <animate
                        attributeName="opacity"
                        values="0;0.8;0.8;0"
                        keyTimes="0;0.12;0.88;1"
                        dur="22s"
                        begin="2.6s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                </g>
              </svg>

              <div class="relative px-5 pb-5 pt-5 sm:px-6">
                <div class="flex items-center justify-between gap-4">
                  <p class="eyebrow">{{ i18n.read('profile.eyebrow') }}</p>
                  <p class="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-secondary">
                    {{ i18n.read('profile.tagline') }}
                  </p>
                </div>

                <div
                  class="relative mt-4 aspect-square w-full overflow-hidden rounded-xl border border-border shadow-card"
                >
                  @if (profilePhoto && !photoFailed()) {
                    <img
                      [src]="profilePhoto"
                      [alt]="profilePhotoAlt"
                      width="400"
                      height="400"
                      class="h-full w-full object-cover"
                      loading="eager"
                      decoding="async"
                      (error)="photoFailed.set(true)"
                    />
                  } @else {
                    <div
                      aria-hidden="true"
                      class="relative flex h-full w-full flex-col items-center justify-center gap-3"
                    >
                      <div class="media-texture absolute inset-0"></div>
                      <span class="relative font-heading text-5xl font-medium text-primary"
                        >MB</span
                      >
                      <span
                        class="relative text-[0.68rem] uppercase tracking-[0.16em] text-secondary"
                      >
                        {{ i18n.read('profile.photoPlaceholder') }}
                      </span>
                    </div>
                  }
                </div>

                <div class="mt-4">
                  <p class="font-heading text-lg font-medium text-primary sm:text-xl">
                    {{ name }}
                  </p>
                  <p class="mt-1 text-sm font-semibold text-accent">
                    {{ i18n.read('profile.role') }}
                  </p>
                </div>

                <ul class="mt-4 space-y-2">
                  <li class="flex items-center gap-3 text-sm">
                    <app-icon name="map-pin" [size]="15" class="text-accent" />
                    <span class="text-secondary">{{ profileLocation }}</span>
                  </li>
                  <li>
                    <a
                      [href]="'mailto:' + email"
                      class="flex items-center gap-3 text-sm text-secondary transition-colors hover:text-accent"
                    >
                      <app-icon name="mail" [size]="15" class="text-accent" />
                      {{ email }}
                    </a>
                  </li>
                  <li>
                    @if (profilePhone) {
                      <a
                        [href]="'tel:' + profilePhone"
                        class="flex items-center gap-3 text-sm text-secondary transition-colors hover:text-accent"
                      >
                        <app-icon name="phone" [size]="15" class="text-accent" />
                        {{ profilePhone }}
                      </a>
                    } @else {
                      <span class="flex items-center gap-3 text-sm">
                        <app-icon name="phone" [size]="15" class="text-accent" />
                        <span class="text-secondary">{{ profilePhoneFallback }}</span>
                      </span>
                    }
                  </li>
                </ul>

                <div class="mt-4 border-t border-border/70 pt-4">
                  <p class="eyebrow">{{ i18n.read('profile.technicalFocus') }}</p>
                  <ul class="mt-2.5 flex flex-wrap gap-2">
                    @for (tech of focus; track tech) {
                      <li>
                        <app-tag>{{ tech }}</app-tag>
                      </li>
                    }
                  </ul>
                </div>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  `,
})
export class HeroSection implements AfterViewInit {
  private readonly elementRef = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly animation = inject(AnimationService);
  private readonly cvService = inject(CvService);

  protected readonly i18n = inject(LanguageService);
  protected readonly stats = HERO_STATS;
  protected readonly profilePath1 = PROFILE_PATH_1;
  protected readonly profilePath2 = PROFILE_PATH_2;
  protected readonly profilePath3 = PROFILE_PATH_3;
  protected readonly tagline = SITE.tagline;
  protected readonly github = SITE.socials.github;
  protected readonly linkedin = SITE.socials.linkedin;
  protected readonly email = SITE.email;
  protected readonly name = SITE.name;
  protected readonly profilePhoto = PROFILE.photo;
  protected readonly profilePhotoAlt = PROFILE.photoAlt;
  protected readonly profilePhone = PROFILE.phone;
  protected readonly profilePhoneFallback = PROFILE.phoneFallback;
  protected readonly profileLocation = PROFILE.location;
  protected readonly focus = PROFILE.focus;
  protected readonly photoFailed = signal(false);

  protected readonly cvAvailable = this.cvService.available;
  protected readonly cvUrl = this.cvService.cvUrl;
  protected readonly cvFileName = this.cvService.cvFileName;

  protected onDownloadCv(event: Event): void {
    event.preventDefault();
    this.cvService.download();
  }

  async ngAfterViewInit(): Promise<void> {
    this.cvService.check();
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const gsap = (await this.animation.loadGsap())!;
    const targets = this.elementRef.nativeElement.querySelectorAll(
      '[data-hero-reveal]',
    ) as gsap.DOMTarget;
    gsap.fromTo(
      targets,
      { autoAlpha: 0, y: 28 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.15,
      },
    );
  }
}
