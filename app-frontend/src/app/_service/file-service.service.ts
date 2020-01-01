import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { of, Observable } from 'rxjs';

@Injectable()
export class FileService {

  constructor(private http: HttpClient, ) {
  }

  allMovies: { id: string, title: string }[];


  public async getAllMovies() {
    if (isNullOrUndefined(this.allMovies)) {
      return this.readMoviesFile();
    } else {
      return this.allMovies;
    }
  }




  private readResultsFile() {
    return this.readFile('/assets/results.csv').toPromise().then((data: string) => {
      // console.log(data);

    });
  }

  private readMoviesFile() {

    const allMovies: { id: string, title: string }[] = [];

    return this.readFile('/assets/testset_movies.csv').toPromise().then((data: string) => {
      let dataLineSeparated = data.split('\n');
      dataLineSeparated = dataLineSeparated.slice(1);
      for (const line of dataLineSeparated) {
        const cells = line.split(',');
        if (cells.length === 2) {
          allMovies.push({ id: cells[0], title: cells[1] });

        } else if (cells.length > 2) {

          const lastTitleCellIndex = cells.length - 1;
          if (cells[1].startsWith('\"')) {
            cells[1] = cells[1].slice(1);
          }
          if (cells[lastTitleCellIndex].endsWith('\"')) {
            cells[lastTitleCellIndex] = cells[lastTitleCellIndex].slice(0, cells[lastTitleCellIndex].length - 1);
          }

          let fusedTitleString = '';
          for (let i = 1; i <= lastTitleCellIndex; i++) {
            fusedTitleString = fusedTitleString + ',' + cells[i];
          }
          fusedTitleString = fusedTitleString.slice(1);

          allMovies.push({id: cells[0], title: fusedTitleString});
        }
      }

      this.allMovies = allMovies;
      return allMovies;

    });
  }


  private readFile(filePath: string) {
    return this.http.get(filePath, { responseType: 'text' as 'json' });
  }


}
