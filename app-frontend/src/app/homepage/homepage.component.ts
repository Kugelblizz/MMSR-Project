import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNullOrUndefined, isNull } from 'util';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FileService } from '../_service/file-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})

export class HomepageComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private fileService: FileService,
  ) { }

  resultData: any;
  movieNames: any;

  vidIds: string;
  vidSnippets = [];

  allMovies: { id: string, title: string }[] = [];

  myControl = new FormControl();
  myForm = new FormGroup({ myControl: this.myControl });

  autoCompleteOptions: { id: string, title: string }[] = [];
  filteredOptions: Observable<{ id: string, title: string }[]>;

  isLoaded: boolean;

  videoIds = [];

  ngOnInit() {

    // this.readFile('/assets/results.csv').toPromise().then((data: string) => {
    //   // console.log(data);

    // });

    this.fileService.getAllMovies().then((result) => {
      console.log(result);
      this.allMovies = result;
      this.autoCompleteOptions = this.allMovies;

    }).then(() => {
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      this.isLoaded = true;
    });
  }

  private _filter(value: string): { id: string, title: string }[] {
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
    this.router.navigateByUrl(`result/${option.id}`);

  }

}
