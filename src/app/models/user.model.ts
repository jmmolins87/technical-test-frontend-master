export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  completedIds: string[];
  favoriteIds: string[];
  isMinor?: boolean;
}
