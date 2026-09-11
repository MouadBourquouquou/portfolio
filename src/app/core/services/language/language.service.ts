import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { CATEGORY_KEYS, LANGUAGES, SKILL_CATEGORY_KEYS, TRANSLATIONS } from '@core/i18n';
import type { BeatTranslation, SupportedLanguage } from '@core/i18n';
import type { Project } from '@core/models/project.model';
import type { Experience } from '@core/models/experience.model';
import type { Article } from '@core/models/article.model';
import { EXPERIENCE } from '@data/experience';

const STORAGE_KEY = 'lang';

/**
 * Runtime language manager.
 *
 * English is the default and the SSR-safe initial state; `init()` adopts the
 * persisted preference only after hydration, so the server render and the
 * first client render are always English. When a non-English language is
 * active, `<html lang>` is set so the whole document follows the selected
 * language (both English and French read left-to-right, so `dir` stays
 * `ltr`).
 *
 * Content that already lives in `src/data` is only overridden for non-English
 * languages: `experienceItem()` and `project()` return null in English so the
 * data files stay the single source of truth, matching `en.json`'s empty
 * sections.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  /** The active language ('en' until initialized). */
  readonly lang = signal<SupportedLanguage>('en');

  /** Reading direction for the active language (both supported languages are LTR). */
  readonly dir = computed<'ltr'>(() => 'ltr');

  private initialized = false;

  /** Initializes browser-side state. Idempotent; safe to call once. */
  init(): void {
    if (!this.isBrowser || this.initialized) {
      return;
    }
    this.initialized = true;

    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage unavailable — keep the English default */
    }

    const resolved: SupportedLanguage =
      stored && LANGUAGES.includes(stored as SupportedLanguage)
        ? (stored as SupportedLanguage)
        : 'en';

    this.lang.set(resolved);
    this.apply();
  }

  /** Sets the active language and applies it to the document. */
  setLang(lang: SupportedLanguage, persist = true): void {
    this.lang.set(lang);
    if (!this.isBrowser) {
      return;
    }
    this.apply();
    if (persist) {
      try {
        window.localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        /* storage unavailable */
      }
    }
  }

  /**
   * Reads a dictionary string by dot path, with fallbacks:
   * active language → English → provided fallback → the key itself.
   */
  read(key: string, fallback?: string): string {
    const resolved = this.resolve(this.dict(), key) ?? this.resolve(TRANSLATIONS.en, key);
    if (typeof resolved === 'string') {
      return resolved;
    }
    return fallback ?? key;
  }

  /** Localized label for an archive project category ("Product Engineering" → …). */
  categoryLabel(category?: string | null): string {
    if (!category) {
      return '';
    }
    const dictionaryKey = CATEGORY_KEYS[category];
    return dictionaryKey
      ? this.read(`projectsPage.categories.${dictionaryKey}`, category)
      : category;
  }

  /** Localized label for a toolbox category ("Languages" → …). */
  skillCategoryLabel(category?: string | null): string {
    if (!category) {
      return '';
    }
    const dictionaryKey = SKILL_CATEGORY_KEYS[category];
    return dictionaryKey ? this.read(`toolbox.categories.${dictionaryKey}`, category) : category;
  }

  /**
   * Localized label for an article category. Unlike projects and skills, the
   * article `categoryKey` already IS the dictionary key ("git", "github", …).
   */
  articleCategoryLabel(categoryKey?: string | null): string {
    if (!categoryKey) {
      return '';
    }
    return this.read(`blogPage.categories.${categoryKey}`, categoryKey);
  }

  /** The "about" beats for the active language (English beats live in en.json). */
  beats(): readonly BeatTranslation[] {
    return this.dict().about.beats;
  }

  /**
   * Translated experience entry for the active language, or null in English
   * (English copy lives in `src/data/experience`).
   *
   * The translation is merged over the English source so structural fields
   * (`period`, `kind`, `tags`) stay intact while free text (`role`,
   * `organization`, `summary`) is replaced.
   */
  experienceItem(index: number): Experience | null {
    if (this.lang() === 'en') {
      return null;
    }
    const translation = this.dict().experience.items[index];
    const english = EXPERIENCE[index];
    if (!translation) {
      return null;
    }
    return { ...english, ...translation } as Experience;
  }

  /**
   * A project with the active language's content merged over the English data,
   * or null in English (English copy lives in `src/data/projects`).
   */
  project(project: Project): Project | null {
    if (this.lang() === 'en') {
      return null;
    }
    const translation = this.dict().projectsData[project.slug];
    if (!translation) {
      return null;
    }

    const translated: Project = { ...project };
    if (translation.title) {
      translated.title = translation.title;
    }
    if (translation.summary) {
      translated.summary = translation.summary;
    }
    if (translation.description) {
      translated.description = translation.description;
    }
    if (translation.role) {
      translated.role = translation.role;
    }
    if (translation.problem) {
      translated.problem = translation.problem;
    }
    if (translation.problemPoints) {
      translated.problemPoints = translation.problemPoints;
    }
    if (translation.contribution) {
      translated.contribution = translation.contribution;
    }
    if (translation.contributionPoints) {
      translated.contributionPoints = translation.contributionPoints;
    }
    if (translation.decisions) {
      translated.decisions = translation.decisions;
    }
    if (translation.result) {
      translated.result = translation.result;
    }
    if (translation.learnings) {
      translated.learnings = translation.learnings;
    }
    return translated;
  }

  /**
   * An article with the active language's content merged over the English
   * data, or null in English (English copy lives in `src/data/articles`).
   */
  article(article: Article): Article | null {
    if (this.lang() === 'en') {
      return null;
    }
    const translation = this.dict().articlesData[article.slug];
    if (!translation) {
      return null;
    }

    const translated: Article = { ...article };
    if (translation.title) {
      translated.title = translation.title;
    }
    if (translation.excerpt) {
      translated.excerpt = translation.excerpt;
    }
    if (translation.intro) {
      translated.intro = translation.intro;
    }
    if (translation.seoTitle) {
      translated.seoTitle = translation.seoTitle;
    }
    if (translation.seoDescription) {
      translated.seoDescription = translation.seoDescription;
    }
    if (translation.keyIdea) {
      translated.keyIdea = translation.keyIdea;
    }
    if (translation.blocks) {
      translated.blocks = translation.blocks;
    }
    return translated;
  }

  private dict() {
    return TRANSLATIONS[this.lang()];
  }

  private resolve(source: object, key: string): unknown {
    return key.split('.').reduce<unknown>(
      (node, part) => {
        if (node === null || node === undefined || typeof node !== 'object') {
          return undefined;
        }
        return (node as { [key: string]: unknown })[part];
      },
      source as { [key: string]: unknown },
    );
  }

  private apply(): void {
    const root = this.document.documentElement;
    root.setAttribute('lang', this.lang());
    root.setAttribute('dir', this.dir());
  }
}
