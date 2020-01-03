import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNullOrUndefined, isNull } from 'util';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer) { }

  resultData: any;
  movieNames: any;

  vidIds: string;
  vidSnippets = [];
  ytApiKey: string;

  videoIds = [];

  ngOnInit() {

    // this.readFile('/assets/results.csv').toPromise().then((data) => {
    //   console.log(data);
    // });

    // this.readFile('/assets/devset_movies.csv').toPromise().then((data) => {
    //   console.log(data);
    // });

    // this.readFile('/assets/testset_ids.txt').toPromise().then((data: string) => {
    //   console.log(data);
    //   const lines = data.split('\n');

    //   const vidIds: string[] = [];
    //   for (const line of lines) {
    //     if (!isNullOrUndefined(line)) {
    //       const splitLine = line.split(',')[0];
    //       if (!isNullOrUndefined(splitLine)) {
    //         const splitCell = splitLine.substr(10);
    //         vidIds.push(splitCell);
    //       }
    //     }
    //   }
    //   console.log(vidIds);
    //   this.vidIds = vidIds.join('\n');

    // });
    this.readFile('/assets/apikey.env').toPromise().then((data: string) => {
      const keys = data.split('\n');
      this.ytApiKey = keys[0];
    }).then(() => {

    this.readFile('/assets/testset_vididsOnly.txt').toPromise().then((data: string) => {
      // console.log(data);
      this.videoIds = data.split('\n');
      // console.log(this.videoIds);
      this.videoIds = this.videoIds.slice(0, 10);

    }).then(() => {
      this.getVideoNameById();
    });
  });

    // this.readFile('/assets/test100.json').toPromise().then((data: string) => {
    //   // console.log(data);
    //   let jfile = JSON.parse(data);
    //   console.log(jfile);
    // });



  }

  exportFile(content: string) {
    const blob = new Blob([content], { type: 'text/plain' });
    // console.log(blob);
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  exportJSONtoFile(content: any[]) {
    // let blob = new Blob(content, { type: 'application/json' });
    // // console.log(blob);
    // let url = window.URL.createObjectURL(blob);
    // window.open(url);
    const storage: string[] = [];
    storage.push('[');
    for (const entry of this.vidSnippets) {
      if (!isNullOrUndefined(entry)) {
        storage.push(entry);
        storage.push(',');
      }
    }
    storage.pop();
    storage.push(']');

    const blob = new Blob(storage, { type: 'application/json' });
    const data = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = data;
    link.download = 'test.json';
    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);
  }

  getVideoNameById() {
    window.localStorage.clear();
    this.vidSnippets = [];
    this.createPromise();
  }

  createPromise() {
    Promise.all([this.accessYoutubeAPI(this.videoIds.pop(), this.ytApiKey)]).then(() => {
      if (this.videoIds.length > 0) {
        this.createPromise();
      } else {
        console.log('done fetching');
      }
    });
  }

  // tslint:disable-next-line: member-ordering
  storageIndex = 0;
  accessYoutubeAPI(videoId: string, ytApiKey: string): Promise<any> {
    return this.http.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + videoId + '&key=' + ytApiKey)
      .toPromise().then((data: any) => {
        // console.log(data);
        console.log(this.storageIndex);

        if (!isNullOrUndefined(data.items) && !isNullOrUndefined(data.items[0])) {
          data.items[0].snippet.videoId = videoId;
          this.vidSnippets.push(JSON.stringify(data.items[0].snippet));
          this.storageIndex++;
        } else {
          console.error(data);
          console.error(videoId);
        }
      });
  }




  private readFile(filePath: string) {
    return this.http.get(filePath, { responseType: 'text' as 'json' });
  }

}
