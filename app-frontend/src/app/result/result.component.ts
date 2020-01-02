import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { FileService } from '../_service/file-service.service';
import { MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})

export class ResultComponent implements OnInit {

  constructor(
    private fileService: FileService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  movieEntry: { id: string, title: string };
  allMovies: { id: string, title: string }[];

  movieId: string;
  results: any;

  myControl = new FormControl();
  myForm = new FormGroup({ myControl: this.myControl });

  autoCompleteOptions: { id: string, title: string }[] = [];
  filteredOptions: Observable<{ id: string, title: string }[]>;


  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['movieId', 'movieclipId', 'sim', 'rank'];

  isLoaded: boolean;

  ngOnInit() {

    Promise.all([
      this.route.params.subscribe((params) => {
        console.log("params");
        console.log(params);
        this.movieId = params.movieId;
      })
    ]).then(() => {



      Promise.all([
        this.fileService.getAllMovies().then((result) => {
          console.log('RESULT');
          console.log(result);
          this.allMovies = result;
          this.autoCompleteOptions = this.allMovies;
        }).then(() => {
          this.fileService.getMovieForId(this.movieId).then((result) => {
            this.movieEntry = result;
          });
        }),

        this.fileService.getResultsForMovie(this.movieId).then((result) => {
          console.log('filtered Result');
          console.log(result);
          this.results = result;
        })
      ]).then(() => {
        this.dataSource.data = this.results;

        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );


        this.isLoaded = true;
      });

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

  returnClicked() {
    this.router.navigateByUrl('/homepage');
  }

  onOptionClick(option: any) {
    this.router.navigateByUrl(`result/${option.id}`);
    this.ngOnInit();

  }

}
