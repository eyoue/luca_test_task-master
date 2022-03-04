import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-content-with-label',
  templateUrl: './content-with-label.component.html',
  styleUrls: ['./content-with-label.component.scss']
})
export class ContentWithLabelComponent {
  @Input() label: string = ''
}
