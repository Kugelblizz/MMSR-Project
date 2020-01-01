import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { FileService } from '../_service/file-service.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})

export class ResultComponent implements OnInit {

  constructor(
    private fileService: FileService) { }

  result: any;

  isLoaded: boolean;

  ngOnInit() {
    this.fileService.getAllMovies().then((result) => {
      console.log('RESULT');
      console.log(result);
    });
  }


}
