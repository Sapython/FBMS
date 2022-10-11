import { AfterViewInit, Component, OnInit } from '@angular/core';
import QrCreator from 'qr-creator';
import { first } from 'rxjs';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-qr-codes',
  templateUrl: './qr-codes.component.html',
  styleUrls: ['./qr-codes.component.scss']
})
export class QrCodesComponent implements OnInit, AfterViewInit {

  constructor(private databaseService:DatabaseService,private dataProvider:DataProvider) { }
  tables:any[] = []
  ngOnInit(): void {
    this.dataProvider.pageSetting.blur = true
    this.databaseService.getTablePromise().then((rooms:any)=>{
      this.tables = []
      rooms.forEach((room:any,index:number)=>{
        this.tables.push(room.data())
      })
      console.log(this.tables)
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.tables.forEach((table:any,index:number)=>{
        QrCreator.render({
          text: 'https://viraj-qrmenu.web.app/'+this.dataProvider.currentProject.projectId+'/splash?table='+table.tableNo,
          radius: 0.1, // 0.0 to 0.5
          ecLevel: 'H', // L, M, Q, H
          fill: '#ea7c69', // foreground color
          background: null, // color or null for transparent
          size: 512 // in pixels
        }, document.querySelector('#qrCode'+table.tableNo)!);
      })
      this.dataProvider.pageSetting.blur = false;
    },2000)   
  }

  download(span:any){
    console.log(span)
    const canvas = span.querySelector('canvas')
    const a = document.createElement('a')
    a.href = canvas.toDataURL()
    a.download = 'qr-code.png'
    a.click()
  }

}
