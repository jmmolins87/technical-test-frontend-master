import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompletedListComponent } from '../../components/completed-list/completed-list.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-dashboard-list-page',
  standalone: true,
  imports: [CommonModule, CompletedListComponent, HeaderComponent],
  templateUrl: './dashboard-list.page.html'
})
export class DashboardListPage {}
