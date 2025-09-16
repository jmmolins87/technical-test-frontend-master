import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaImageComponent } from '../media-image/media-image.component';

@Component({
  selector: 'app-media-card',
  standalone: true,
  imports: [CommonModule, MediaImageComponent],
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.scss']
})
export class MediaCardComponent {
  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() defaultImg: string = '';
  @Input() name: string = '';
  @Input() categories: string[] = [];
  @Input() isCompleted: boolean = false;
  @Input() isFavorite: boolean = false;
  @Output() completed = new EventEmitter<void>();
  @Output() favorite = new EventEmitter<Event>();
}
