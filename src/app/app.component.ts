import { Component } from '@angular/core';
import { DataProvider } from './providers/data.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'FBMS';

  constructor(public dataProvider: DataProvider) {}
}
