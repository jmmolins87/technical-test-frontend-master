import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { UserProfile } from '../../models/user.model';
import { Observable } from 'rxjs';

import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-user-selection',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmModalComponent],
  templateUrl: './user-selection.component.html'
})
export class UserSelectionComponent {
  private userService = inject(UserService);
  private rmService = inject(RickAndMortyService);
  private router = inject(Router);

  users$: Observable<UserProfile[]> = this.userService.users;
  loading = false;
  error: string | null = null;
  editMode = false;
  defaultImg = 'assets/No_image_available.png';

  // Modal state
  modalOpen = false;
  modalUser: UserProfile | null = null;

  trackById = (_: number, item: UserProfile) => item.id;

  addRandomUser() {
    this.loading = true;
    this.error = null;
    this.rmService.getRandomCharacter().subscribe({
      next: (c) => {
        const user: UserProfile = {
          id: `rm-${c.id}-${Date.now()}`,
          name: c.name,
          avatar: c.image,
          completedIds: [],
          favoriteIds: []
        };
        this.userService.addUser(user);
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo crear el usuario. Inténtalo de nuevo.';
        this.loading = false;
      }
    });
  }

  selectUser(user: UserProfile) {
  this.userService.selectUser(user);
  this.router.navigateByUrl('/dashboard');
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  onDeleteUser(user: UserProfile, ev?: Event) {
    ev?.stopPropagation();
    this.modalUser = user;
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
    this.modalUser = null;
  }

  confirmModal() {
    if (!this.modalUser) return;
    this.userService.deleteUser(this.modalUser.id);
    this.closeModal();
  }
}
