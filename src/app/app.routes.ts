import { Routes } from '@angular/router';
import { UserSelectionComponent } from './components/user-selection/user-selection.component';
import { CompletedListComponent } from './components/completed-list/completed-list.component';
import { ProfileEditPage } from './pages/profile-edit/profile-edit.page';
import { DashboardListPage } from './pages/dashboard-list/dashboard-list.page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: UserSelectionComponent },
  { path: 'dashboard', component: DashboardListPage },
  { path: 'completed', component: CompletedListComponent },
  { path: 'profile/:id/edit', component: ProfileEditPage },
  { path: '**', redirectTo: '' }
];
