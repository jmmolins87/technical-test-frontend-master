export type ContentType = 'movies' | 'videogames';

export interface FilterState {
  types: Set<ContentType>;
  categories: Set<string>;
  onlyCompleted: boolean;
  favoritesOnly: boolean;
}

export function emptyFilterState(): FilterState {
  return {
    types: new Set<ContentType>(),
    categories: new Set<string>(),
    onlyCompleted: false,
    favoritesOnly: false,
  };
}