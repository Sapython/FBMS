import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-feature-widget',
  templateUrl: './menu-feature-widget.component.html',
  styleUrls: ['./menu-feature-widget.component.scss']
})
export class MenuFeatureWidgetComponent implements OnInit {

  @Input() feature_Name:string = 'Base Menu'
  @Input() button_Name:string = 'Manage'
  @Input() src:string = 'assets/menu1.png'
  @Input() link:string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
