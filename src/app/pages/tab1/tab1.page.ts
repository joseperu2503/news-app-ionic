import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { Article, articleByCategoryAndPage, NewsResponse } from 'src/app/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  data: articleByCategoryAndPage = {
    page: 0,
    articles: [],
    totalResults: 0
  }
  @ViewChild(IonInfiniteScroll) scroll: IonInfiniteScroll

  constructor(
    private newService: NewsService
  ) {}

  ngOnInit() {
    this.newService.getTopHeadlines()
    .subscribe( res => {
      this.data = res
    })
  }

  loadData(){
    if(!this.verifyScroll()){
      this.scroll.disabled = false
      this.newService.getTopHeadLinesByCategory('business', true)
      .subscribe( res => {
        this.data = res
        this.scroll.complete()
      })
    }
  }

  verifyScroll(){
    this.scroll.disabled = this.data.articles.length == this.data.totalResults

    return this.scroll.disabled
  }

}
