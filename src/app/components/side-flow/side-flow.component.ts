import { trigger, transition, style, animate, state } from '@angular/animations';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataProvider } from 'src/app/providers/data.provider';

@Component({
  selector: 'app-side-flow',
  templateUrl: './side-flow.component.html',
  styleUrls: ['./side-flow.component.scss'],
  animations:[
    trigger('animation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s cubic-bezier(0.25, 1, 0.5, 1)',style({transform:'translateX(0%)'}))
      ]),
    ]),
    trigger('openClose', [
      // ...
      state('open', style({
        transform: 'translateX(0%)',
      })),
      state('closed', style({
        transform: 'translateX(100%)',
      })),
      state('fullOpen', style({
        width: '90vw',
      })),
      transition(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('5s cubic-bezier(0.25, 1, 0.5, 1)',style({transform:'translateX(100%)'}))
      ]),
      transition('open => closed', [
        animate('0.3s cubic-bezier(0.22, 1, 0.36, 1)')
      ]),
      transition('closed => open', [
        animate('0.5s cubic-bezier(0.22, 1, 0.36, 1)')
      ]),
      transition('fullOpen => open', [
        animate('0.3s cubic-bezier(0.22, 1, 0.36, 1)')
      ]),
      transition('fullOpen => closed', [
        animate('0.5s cubic-bezier(0.22, 1, 0.36, 1)')
      ]),
      transition('open => fullOpen', [
        animate('0.5s cubic-bezier(0.22, 1, 0.36, 1)')
      ]),
    ]),
  ]
})
export class SideFlowComponent implements OnInit, OnChanges {
  // @HostBinding('@openClose')
  @Input() isOpen:'open' | 'closed' | 'fullOpen' = 'open';
  @Input() component:any;
  @Output() dismiss:EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private dataProvider:DataProvider,private viewContainerRef: ViewContainerRef) { }
  overlayDismissListener:Subscription = Subscription.EMPTY;
  
  ngOnInit() {
    this.dataProvider.pageSetting.overlay = true;
    this.overlayDismissListener = this.dataProvider.overlayDismissed.subscribe(()=>{
      this.dataProvider.pageSetting.overlay = false;
      // this.dismiss.emit(false);
      // this.ngOnDestroy();
    })
    if(this.component){
      this.viewContainerRef.createComponent(this.component);
    }
  }

  shuffleView(){
    this.isOpen = this.isOpen === 'open' ? 'fullOpen' : 'open';
  }

  ngOnDestroy(): void {
    this.overlayDismissListener.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes);
  }
}
