import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/app/services/alerts-and-notifications.service';
import { DatabaseService } from 'src/app/services/database.service';
import { QrCodesComponent } from './qr-codes/qr-codes.component';
import { QrSettingsComponent } from './qr-settings/qr-settings.component';

@Component({
  selector: 'app-qr-menu',
  templateUrl: './qr-menu.component.html',
  styleUrls: ['./qr-menu.component.scss']
})
export class QrMenuComponent implements OnInit {
  constructor(private databaseService:DatabaseService,private dialog:Dialog,private dataProvider:DataProvider,private alertify:AlertsAndNotificationsService) { }
  bills:any[] = []

  ngOnInit(): void {
      
  }

  getQrCode(){
    const inst = this.dialog.open(QrCodesComponent)
    // inst.componentInstance?.close.subscribe(()=>{
  }

  editQrSettings(){
    const inst = this.dialog.open(QrSettingsComponent)
    inst.componentInstance?.close.subscribe(()=>{
      inst.close()
    })
  }

  viewBill(bill:any){}

  deleteBill(bill:any){}

}
