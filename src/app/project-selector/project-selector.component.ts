import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data.provider';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-project-selector',
  templateUrl: './project-selector.component.html',
  styleUrls: ['./project-selector.component.scss']
})
export class ProjectSelectorComponent implements OnInit {

  constructor(private databaseService:DatabaseService,public dataProvider:DataProvider) { }

  ngOnInit(): void {
    console.log("Projects")
    console.log(this.dataProvider.projects)
  }

}
