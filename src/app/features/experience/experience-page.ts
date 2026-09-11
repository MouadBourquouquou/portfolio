import { Component, PLATFORM_ID, effect, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ExperienceSection } from '@features/experience/experience-section';
import { ToolboxSection } from '@features/home/toolbox-section';
import { SeoService } from '@core/services/seo/seo.service';
import { LanguageService } from '@core/services/language/language.service';
import { SITE, absoluteUrl } from '@core/constants/site.constants';

@Component({
  selector: 'app-experience-page',
  imports: [ExperienceSection, ToolboxSection],
  template: `
    <app-experience-section />
    <app-toolbox-section />
  `,
})
export class ExperiencePage {
  private readonly seo = inject(SeoService);
  private readonly i18n = inject(LanguageService);
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    effect(() => {
      this.i18n.lang();
      if (isPlatformBrowser(this.platformId)) {
        this.setSeo();
      }
    });
  }

  ngOnInit(): void {
    this.setSeo();
  }

  private setSeo(): void {
    const title = this.i18n.read('meta.experience.title');
    const description = this.i18n.read('meta.experience.description');
    const ogImage = absoluteUrl(SITE.defaultOgImage);
    this.seo.setPage({
      title,
      description,
      canonicalUrl: `${SITE.url}/experience`,
      og: {
        title,
        description,
        type: 'website',
        url: `${SITE.url}/experience`,
        siteName: SITE.name,
        image: ogImage,
        imageAlt: ogImage ? SITE.defaultOgImageAlt || SITE.name : undefined,
      },
      twitter: {
        title,
        description,
        card: ogImage ? 'summary_large_image' : 'summary',
        image: ogImage,
      },
    });
  }
}
