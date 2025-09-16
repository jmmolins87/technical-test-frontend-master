import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { UserProfile } from '../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  private userService = inject(UserService);
  selectedUser$: Observable<UserProfile | null> = this.userService.selectedUser;
  defaultImg = 'assets/No_image_available.png';
}
