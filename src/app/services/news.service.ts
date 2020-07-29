import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { News } from '../models/news';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  news$: Subject<News[]>;
  newsRef = this.db.list<any>('news');
  constructor(private db: AngularFireDatabase) { 
  }

  getNews() {
    return this.newsRef
    // .valueChanges()
    .snapshotChanges()
    .pipe(map((ns) => {
      return ns.map(n => {
        return {
          ...{ _id: n.key }, ...n.payload.val()
        }
      })
    }))
  }
}
