import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNullOrUndefined, isNull } from 'util';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * api key
 * AIzaSyC4xTG0Dq-KkrZ9Twyx27ZE7OZc1EQwDtU
 */


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})

export class HomepageComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer) { }

  resultData: any;
  movieNames: any;

  vidIds: string;
  vidSnippets = [];

  allMovies: {id: string, title: string}[] = [];

  // ytApiKey = 'AIzaSyC4xTG0Dq-KkrZ9Twyx27ZE7OZc1EQwDtU';
  ytApiKey = 'AIzaSyCjqYc_0rN4G4rGfaLFudHN4aDzYN1ccW4';
  videoIds = [];

  ngOnInit() {

    this.readFile('/assets/results.csv').toPromise().then((data: string) => {
      // console.log(data);

    });

    this.readFile('/assets/testset_movies.csv').toPromise().then((data: string) => {
      // console.log(data);
      let dataLineSeparated = data.split('\n');
      dataLineSeparated = dataLineSeparated.slice(1);
      for (const line of dataLineSeparated) {
        const cells = line.split(',');
        this.allMovies.push({id: cells[0], title: cells[1]});
      }
      console.log(this.allMovies);
    });




  }


  private readFile(filePath: string) {
    return this.http.get(filePath, { responseType: 'text' as 'json' });
  }

}
