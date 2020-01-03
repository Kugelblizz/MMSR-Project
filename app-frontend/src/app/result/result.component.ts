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
import { DatePipe, formatDate } from '@angular/common';

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

  youtubeInfo: any[];
  relevantYoutubeInfo: any[];

  myControl = new FormControl();
  myForm = new FormGroup({ myControl: this.myControl });

  autoCompleteOptions: { id: string, title: string }[] = [];
  filteredOptions: Observable<{ id: string, title: string }[]>;


  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['thumbnail', 'title', 'date', 'action'];

  displayedColumnsWithSim: string[] = ['thumbnail', 'title', 'sim', 'date', 'action'];
  displayedColumnsWithoutSim: string[] = ['thumbnail', 'title', 'date', 'action'];
  
  showSimilarity: boolean;
  isLoaded: boolean;
  

  ngOnInit() {
    this.showSimilarity = false;
    this.isLoaded = false;

    Promise.all([
      this.route.params.subscribe((params) => {
        // console.log("params");
        // console.log(params);
        this.movieId = params.movieId;
      })
    ]).then(() => {



      Promise.all([
        this.fileService.getAllMovies().then((result) => {
          // console.log('RESULT');
          // console.log(result);
          this.allMovies = result;
          this.autoCompleteOptions = this.allMovies;
        }).then(() => {
          this.fileService.getMovieForId(this.movieId).then((result) => {
            this.movieEntry = result;
          });
        }),

        this.fileService.getResultsForMovie(this.movieId).then((result) => {
          // console.log('filtered Result');
          // console.log(result);
          this.results = result;
        }),
        this.fileService.readFile('/assets/testset_youtube_with_ids.json').toPromise().then((result: string) => {
          console.log("read json");
          const resultJson = JSON.parse(result);
          this.youtubeInfo = resultJson;
        })

      ]).then(() => {

        let b = true;

        const relevantYoutubeInfo = this.youtubeInfo.filter((value) => {
          return this.results.find((result) => {
            const id: string = result.movieclipId;
            return id.substring(10) === value.videoId;
          });
        });
        this.relevantYoutubeInfo = relevantYoutubeInfo;

        for (const result of this.results) {
          result.youtubeInfo = this.getYoutubeInfoForResult(result.movieclipId);
        }

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

  getYoutubeInfoForResult(movieclipId: string) {
    const result = this.relevantYoutubeInfo.find((entry) => {
      return entry.videoId === movieclipId.substring(10);
    });

    if (isNullOrUndefined(result)) {
      return { title: movieclipId };
    } else {
      result.title = (<string>result.title).replace(/\(\d*\/\d*\)/, '');
      result.title = (<string>result.title).replace(/\(\d\d\d\d\) HD/, '');
      result.title = (<string>result.title).replace(/\(\d\d\d\d\)/, '');
      result.title = (<string>result.title).replace(/Movie CLIP/, '');
      result.title = (<string>result.title).replace(/\| Movieclips/, '');
      result.title = (<string>result.title).replace(/\#[1-9]/, '');
      result.title = (<string>result.title).replace(/ \- HD/, '');



      return result;
    }
  }

  getThumbnailPath(element: any) {
    if (isNullOrUndefined(element.youtubeInfo.thumbnails)) {
      return '/assets/youtubeerror_thumb.jpg';
    } else {
      return element.youtubeInfo.thumbnails.default.url;
    }
  }

  getPublishedAt(element: any) {
    if (isNullOrUndefined(element.youtubeInfo.publishedAt)) {
      return '-';
    } else {
      let pipe = new DatePipe('de-AT');
      
      return formatDate(new Date(element.youtubeInfo.publishedAt), 'dd-MM-yyyy HH:mm:ss', 'de-AT', '+0100');;
    }

  }

  getYoutubeLink(element: any) {
    return 'https://www.youtube.com/watch?v=' + element.movieclipId.substring(10);
  }

  toggleSim() {
    this.showSimilarity = !this.showSimilarity;

    if (this.showSimilarity) {
      this.displayedColumns = this.displayedColumnsWithSim;
    } else {
      this.displayedColumns = this.displayedColumnsWithoutSim;
    }

  }

  returnClicked() {
    this.router.navigateByUrl('/homepage');
  }

  onOptionClick(option: any) {
    this.router.navigateByUrl(`result/${option.id}`);
    this.ngOnInit();
    window.scrollTo(0, 0);

  }

}
