import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss'],
})
export class RoomCardComponent implements OnInit {
  @Input() number: string | number;
  @Input() available: boolean  = false;
  @Input() name: any;
  @Input() id: string;
  @Output() editRoom = new EventEmitter();

  @Output() book:EventEmitter<any> = new EventEmitter<any>();
  @Output() seeBooking:EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private databaseService: DatabaseService,
    private dataProvider: DataProvider,
    private alertify: AlertsAndNotificationsService
  ) {}

  ngOnInit(): void {}
  delete() {
    if (confirm('Are you sure?')) {
      this.dataProvider.pageSetting.blur = true;
      this.databaseService
        .deleteRoom(this.id)
        .then(() => {
          this.alertify.presentToast('Room deleted successfully');
        })
        .catch((err) => {
          this.alertify.presentToast(err);
        })
        .finally(() => {
          this.dataProvider.pageSetting.blur = false;
        });
    }
  }

}
