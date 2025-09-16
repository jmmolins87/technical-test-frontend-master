import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { UserProfile } from '../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-edit-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmModalComponent],
  templateUrl: './profile-edit.page.html'
})
export class ProfileEditPage implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);

  user: UserProfile | null = null;
  sub?: Subscription;
  defaultImg = 'assets/No_image_available.png';
  // Modal state
  modalOpen = false;
  modalType: 'delete' | 'clear' | 'save' | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.sub = this.userService.users.subscribe((users) => {
      this.user = users.find((u) => u.id === id) ?? null;
    });
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  save() {
    this.openModal('save');
  }

  openModal(type: 'delete' | 'clear' | 'save') {
    this.modalType = type;
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
    this.modalType = null;
  }

  confirmModal() {
    if (!this.user) return;
    if (this.modalType === 'delete') {
      this.userService.deleteUser(this.user.id);
      this.router.navigateByUrl('/');
    } else if (this.modalType === 'clear') {
      this.userService.clearCompleted(this.user.id);
    } else if (this.modalType === 'save') {
      const name = (this.user.name ?? '').trim();
      if (!name) return;
      this.userService.updateUser({ ...this.user });
      this.router.navigateByUrl('/');
    }
    this.closeModal();
  }

  cancel() {
    this.router.navigateByUrl('/');
  }
}
