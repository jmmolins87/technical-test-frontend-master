import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-media-image',
  standalone: true,
  templateUrl: './media-image.component.html',
  styleUrls: ['./media-image.component.scss']
})
export class MediaImageComponent {
  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() defaultImg: string = '';
}
