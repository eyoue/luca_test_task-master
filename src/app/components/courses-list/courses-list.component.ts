import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data/data.service";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  courses$ = this.dataService.courses$;

  constructor(private readonly dataService:DataService) { }

  ngOnInit(): void {
  }

}
