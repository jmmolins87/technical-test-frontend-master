import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ListFilters {
  showMovies: boolean;
  showVideogames: boolean;
  showCompletedOnly: boolean;
  showFavoritesOnly: boolean;
  categories: string[]; // selected
}

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filters.component.html'
})
export class FiltersComponent {
  @Input() allCategories: string[] = [];
  @Input() value: ListFilters = {
    showMovies: true,
    showVideogames: true,
    showCompletedOnly: false,
    showFavoritesOnly: false,
    categories: []
  };
  @Output() filtersChange = new EventEmitter<ListFilters>();
  @Output() back = new EventEmitter<void>();

  showCategories = window.innerWidth >= 640;

  toggleFlag(key: keyof Pick<ListFilters, 'showMovies' | 'showVideogames' | 'showCompletedOnly' | 'showFavoritesOnly'>) {
    this.value = { ...this.value, [key]: !this.value[key] } as ListFilters;
    this.filtersChange.emit(this.value);
  }

  toggleCategory(cat: string) {
    const set = new Set(this.value.categories);
    if (set.has(cat)) set.delete(cat);
    else set.add(cat);
    this.value = { ...this.value, categories: Array.from(set) };
    this.filtersChange.emit(this.value);
  }

  onBackClick() {
    this.back.emit();
  }
}
