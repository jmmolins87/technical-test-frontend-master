import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { UserService } from '../../services/user.service';
import { Movie } from '../../models/movie.model';
import { Videogame } from '../../models/videogame.model';
import { UserProfile } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { FiltersComponent, ListFilters } from '../filters/filters.component';
import { MediaImageComponent } from '../media-image/media-image.component';
import { MediaCardComponent } from '../media-card/media-card.component';

@Component({
  selector: 'app-completed-list',
  standalone: true,
  imports: [CommonModule, FiltersComponent, MediaImageComponent, MediaCardComponent],
  templateUrl: './completed-list.component.html',
  styleUrls: ['./completed-list.component.scss']
})
export class CompletedListComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private data = inject(DataService);
  private userService = inject(UserService);

  movies: Movie[] = this.data.getMovies();
  videogames: Videogame[] = this.data.getVideogames();
  user: UserProfile | null = null;
  sub?: Subscription;
  filters: ListFilters = {
    showMovies: true,
    showVideogames: true,
    showCompletedOnly: false,
    showFavoritesOnly: false,
    categories: []
  };
  defaultImg = 'assets/No_image_available.png';

  goBack() {
    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {
    this.sub = this.userService.selectedUser.subscribe((u) => {
      this.user = u;
      if (!u) {
        this.router.navigateByUrl('/');
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  trackByMovie = (_: number, m: Movie) => m._id;
  trackByGame = (_: number, g: Videogame) => g._id;

  private itemIdForMovie(m: Movie) {
    return `m-${m._id}`;
  }
  
  private itemIdForGame(g: Videogame) {
    return `v-${g._id}`;
  }

  isCompletedMovie(m: Movie): boolean {
    if (!this.user) return false;
    return this.user.completedIds.includes(this.itemIdForMovie(m));
  }

  isCompletedGame(g: Videogame): boolean {
    if (!this.user) return false;
    return this.user.completedIds.includes(this.itemIdForGame(g));
  }

  toggleCompletedMovie(m: Movie) {
    if (!this.user) return;
    const id = this.itemIdForMovie(m);
    const set = new Set(this.user.completedIds);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    this.userService.updateUser({ ...this.user, completedIds: Array.from(set) });
  }

  toggleCompletedGame(g: Videogame) {
    if (!this.user) return;
    const id = this.itemIdForGame(g);
    const set = new Set(this.user.completedIds);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    this.userService.updateUser({ ...this.user, completedIds: Array.from(set) });
  }

  // Favorites
  isFavoriteMovie(m: Movie): boolean {
    if (!this.user) return false;
    return this.user.favoriteIds.includes(this.itemIdForMovie(m));
  }

  isFavoriteGame(g: Videogame): boolean {
    if (!this.user) return false;
    return this.user.favoriteIds.includes(this.itemIdForGame(g));
  }

  toggleFavoriteMovie(m: Movie, ev?: Event) {
    ev?.stopPropagation();
    if (!this.user) return;
    const id = this.itemIdForMovie(m);
    const set = new Set(this.user.favoriteIds);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    this.userService.updateUser({ ...this.user, favoriteIds: Array.from(set) });
  }

  toggleFavoriteGame(g: Videogame, ev?: Event) {
    ev?.stopPropagation();
    if (!this.user) return;
    const id = this.itemIdForGame(g);
    const set = new Set(this.user.favoriteIds);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    this.userService.updateUser({ ...this.user, favoriteIds: Array.from(set) });
  }

  // Filtering
  get allCategories(): string[] {
    const set = new Set<string>();
    this.movies.forEach((m) => m.category.forEach((c) => set.add(c)));
    this.videogames.forEach((g) => g.category.forEach((c) => set.add(c)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }

  onFiltersChange(f: ListFilters) {
    this.filters = f;
  }

  get noFiltersSelected(): boolean {
    const f = this.filters;
    return (
      !f.showMovies &&
      !f.showVideogames &&
      !f.showCompletedOnly &&
      !f.showFavoritesOnly &&
      f.categories.length === 0
    );
  }

  get filteredMovies(): Movie[] {
    return this.movies.filter((m) => {
      if (!this.filters.showMovies) return false;
      if (this.filters.categories.length && !m.category.some((c) => this.filters.categories.includes(c))) return false;
      if (this.filters.showCompletedOnly && !this.isCompletedMovie(m)) return false;
      if (this.filters.showFavoritesOnly && !this.isFavoriteMovie(m)) return false;
      return true;
    });
  }

  get filteredGames(): Videogame[] {
    return this.videogames.filter((g) => {
      if (!this.filters.showVideogames) return false;
      if (this.filters.categories.length && !g.category.some((c) => this.filters.categories.includes(c))) return false;
      if (this.filters.showCompletedOnly && !this.isCompletedGame(g)) return false;
      if (this.filters.showFavoritesOnly && !this.isFavoriteGame(g)) return false;
      return true;
    });
  }
}
