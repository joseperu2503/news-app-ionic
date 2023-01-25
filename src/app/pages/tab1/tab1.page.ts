import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { Article, NewsResponse } from 'src/app/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public articles: Article[] = []

  constructor(
    private newService: NewsService
  ) {}

  ngOnInit() {
    this.newService.getTopHeadlines()
    .subscribe( res => {
      this.articles.push(...res.articles)
    })
  }

}
