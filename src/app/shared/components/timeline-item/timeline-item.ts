import { Component, computed, inject, input } from '@angular/core';
import type { Experience } from '@core/models/experience.model';
import { LanguageService } from '@core/services/language/language.service';
import { Tag } from '@shared/ui/tag/tag';

export type TimelineMarker = 'solid' | 'outline';

/**
 * Timeline entry — vertical rail with a dot and hairline rule.
 *
 * Professional entries use a solid accent dot; leadership entries use an
 * outlined marker. Content renders only when an `item` is provided so the
 * component doubles as an empty-style shell.
 */
@Component({
  selector: 'app-timeline-item',
  imports: [Tag],
  template: `
    <div class="relative ps-10">
      <span
        [class]="marker() === 'outline' ? 'border border-accent bg-background' : 'bg-accent'"
        class="absolute start-0 top-2 size-2 rounded-full ring-4 ring-background transition-transform duration-300 group-hover:scale-125"
        aria-hidden="true"
      ></span>
      @if (!last()) {
        <span
          class="absolute bottom-[-2rem] start-[3px] top-[2.25rem] w-px bg-border"
          aria-hidden="true"
        ></span>
      }

      @if (item(); as item) {
        <div class="flex flex-col gap-2 pb-2">
          <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 class="font-heading text-xl font-semibold text-primary">
              {{ item.role }}
            </h3>
            @if (periodLabel(); as period) {
              <p class="text-xs font-medium uppercase tracking-widest text-secondary">
                {{ period }}
              </p>
            }
          </div>

          <p class="text-sm font-medium text-accent">
            {{ item.organization }}
            @if (item.kind === 'leadership') {
              <span
                class="ms-2 rounded-full border border-accent/30 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-widest text-accent"
                >{{ i18n.read('common.leadership') }}</span
              >
            }
          </p>

          @if (item.summary; as summary) {
            <p class="max-w-xl text-sm leading-relaxed text-secondary">
              {{ summary }}
            </p>
          }

          @if (item.tags?.length) {
            <div class="flex flex-wrap gap-2 pt-1">
              @for (tag of item.tags; track tag) {
                <app-tag>{{ tag }}</app-tag>
              }
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class TimelineItem {
  protected readonly i18n = inject(LanguageService);

  readonly item = input<Experience | null>(null);
  readonly marker = input<TimelineMarker>('solid');
  readonly last = input(false);

  protected readonly periodLabel = computed(() => {
    const item = this.item();
    if (!item) {
      return '';
    }
    const start = item.period.start ?? '';
    if (item.period.months) {
      const unit =
        item.period.months === 1 ? this.i18n.read('common.month') : this.i18n.read('common.months');
      return `${start} · ${item.period.months} ${unit}`;
    }
    const end = item.period.current ? this.i18n.read('common.present') : (item.period.end ?? '');
    const label = [start, end].filter(Boolean).join(' — ');
    return label || '';
  });
}
