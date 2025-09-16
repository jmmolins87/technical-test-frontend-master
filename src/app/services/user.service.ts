import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserProfile } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly STORAGE_KEY = 'users';
  private users$ = new BehaviorSubject<UserProfile[]>(this.loadUsers());
  private selectedUser$ = new BehaviorSubject<UserProfile | null>(this.loadSelectedUser());

  get users() {
    return this.users$.asObservable();
  }

  get selectedUser() {
    return this.selectedUser$.asObservable();
  }

  addUser(user: UserProfile) {
    const users = [...this.users$.value, user];
    this.saveUsers(users);
    this.users$.next(users);
  }

  selectUser(user: UserProfile) {
    this.selectedUser$.next(user);
    localStorage.setItem('selectedUser', JSON.stringify(user));
  }

  updateUser(user: UserProfile) {
    const users = this.users$.value.map(u => u.id === user.id ? user : u);
    this.saveUsers(users);
    this.users$.next(users);
    if (this.selectedUser$.value?.id === user.id) {
      this.selectedUser$.next(user);
    }
  }

  clearCompleted(userId: string) {
    const users = this.users$.value.map(u =>
      u.id === userId ? { ...u, completedIds: [] } : u
    );
    this.saveUsers(users);
    this.users$.next(users);
    if (this.selectedUser$.value?.id === userId) {
      this.selectedUser$.next({ ...this.selectedUser$.value, completedIds: [] });
    }
  }

  deleteUser(userId: string) {
    const users = this.users$.value.filter(u => u.id !== userId);
    this.saveUsers(users);
    this.users$.next(users);
    if (this.selectedUser$.value?.id === userId) {
      this.selectedUser$.next(null);
      localStorage.removeItem('selectedUser');
    }
  }
  private loadSelectedUser(): UserProfile | null {
    const data = localStorage.getItem('selectedUser');
    return data ? JSON.parse(data) : null;
  }

  private saveUsers(users: UserProfile[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  private loadUsers(): UserProfile[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
}
