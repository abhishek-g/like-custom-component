import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  //templateUrl: `./app.component.html`,
  template: `
              <form [formGroup]="postsFormGroup">
                <div class="row">
                  <div class="col s6">
                    <app-like formControlName="like"></app-like>
                  </div>
                </div>
              </form>
            `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'like';
  posts$: Observable<any> = new Observable<any>();
  postsFormGroup: FormGroup;
  constructor(private http: HttpClient, private fb: FormBuilder){
    this.postsFormGroup = this.fb.group({
      like: [null]
    })
  }
  ngOnInit(){
    this.getPosts();
  }
  getPosts(){
    this.posts$ = this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
}
