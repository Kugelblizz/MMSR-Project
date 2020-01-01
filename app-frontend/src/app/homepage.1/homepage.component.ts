import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNullOrUndefined, isNull } from 'util';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


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

  allMovies: { id: string, title: string }[] = [];

  myControl = new FormControl();
  myForm = new FormGroup({ myControl: this.myControl });

  autoCompleteOptions: { id: string, title: string }[] = [];
  filteredOptions: Observable<{id: string, title: string}[]>;

  isLoaded: boolean;

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
        if (cells.length === 2) {
          this.allMovies.push({ id: cells[0], title: cells[1] });
        } else {
          //TODO
        }
      }

      this.autoCompleteOptions = this.allMovies;
      console.log(this.allMovies);
      console.log(this.autoCompleteOptions);
      console.log(this.autoCompleteOptions[0]);


    }).then(() => {
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      console.log(this.filteredOptions);
      this.isLoaded = true;
    });






  }


  private readFile(filePath: string) {
    return this.http.get(filePath, { responseType: 'text' as 'json' });
  }

  private _filter(value: string): {id: string, title: string}[] {
    const filterValue = value.toLowerCase();

    if (!isNullOrUndefined(this.myControl.value) && this.myControl.value.length >= 2) {
      return this.autoCompleteOptions.filter(option => option.title.toLowerCase().includes(filterValue));
    } else {
      return [];
    }

  }

  printMyControl() {
    console.log(this.myForm);
    console.log(this.myControl);
  }

  onOptionClick(option: any) {
    //TODO
    console.log('clicked');
    console.log(option);
  }

}
