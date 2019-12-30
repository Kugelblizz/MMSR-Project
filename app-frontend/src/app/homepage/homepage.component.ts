import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.readFile('/assets/results.csv').toPromise().then((data) => {
      console.log(data);
    });


  }

  private readFile(filePath: string) {
    return this.http.get(filePath, { responseType: 'text' as 'json' });
  }

}
