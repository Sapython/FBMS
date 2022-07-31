import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
  query,
  group,
} from '@angular/animations';
@Component({
  selector: 'app-menu-dish-card',
  templateUrl: './menu-dish-card.component.html',
  styleUrls: ['./menu-dish-card.component.scss'],
  animations: [
    trigger('deleteHover', [
      state('default', style({})),
      state('hover', style({})),
      transition('default => hover', [
        group([
          query('.deleteText',animate('0.3s',keyframes([
            style({
              opacity: 0,
              transform: 'translateX(50px)',
            }),
            style({
              opacity: 1,
              transform: 'translateX(0)',
            })
          ]))),
          query('button',animate('0.3s',keyframes([
            style({
              opacity: 0,
              transform: 'translateX(50px)',
            }),
            style({
              opacity: 1,
              transform: 'translateX(0)',
            })
          ]))),
        ])
      ]),
      transition('hover => default', [
        group([
          query('.deleteText',animate('0.3s 1s',keyframes([
            style({
              opacity: 1,
              transform: 'translateX(0px)',
            }),
            style({
              opacity: 0,
              transform: 'translateX(50px)',
            })
          ]))),
          query('button',animate('0.3s 1s',keyframes([
            style({
              opacity: 1,
              transform: 'translateX(0px)',
            }),
            style({
              opacity: 0,
              transform: 'translateX(50px)',
            })
          ]))),
        ])
      ]),
    ]),
  ],
})
export class MenuDishCardComponent {
  @Input() imageSource: string = './assets/images/dish.png';
  @Input() dishName: string = 'Simple Pasta';
  @Input() dishPrice: number = 100;
  @Input() servesLeft: number = 15;
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  deleting: boolean = false;
  deleteHovered: boolean = false;
}
