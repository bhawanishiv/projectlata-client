import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { Subscription } from 'rxjs';
import { News } from 'src/app/models/news';

@Component({
  selector: 'app-news-index',
  templateUrl: './news-index.component.html',
  styleUrls: ['./news-index.component.scss']
})
export class NewsIndexComponent implements OnInit, OnDestroy {
  newsSubscription: Subscription;
  news: News[];
  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsSubscription = this.newsService.getNews().subscribe(news => {
      this.news = news;
    })
  }
  ngOnDestroy() {
    this.newsSubscription.unsubscribe();
  }

}
