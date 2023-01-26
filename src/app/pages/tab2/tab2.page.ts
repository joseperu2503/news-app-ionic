import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article, articleByCategoryAndPage } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(
    private newService: NewsService
  ) {}

  public categories: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology'
  ]
  public selectedCategory: string = this.categories[0]

  @ViewChild(IonInfiniteScroll) scroll: IonInfiniteScroll

  segmentChange(event: any){
    this.selectedCategory = event.detail.value
    this.newService.getTopHeadLinesByCategory(this.selectedCategory)
    .subscribe( res => {
      this.data = res
      this.verifyScroll()
    })
  }

  // articles: Article[] = []

  data: articleByCategoryAndPage = {
    page: 0,
    articles: [],
    totalResults: 0
  }

  ngOnInit(){
    this.newService.getTopHeadLinesByCategory(this.selectedCategory)
    .subscribe( res => {
      this.data = res
    })
  }

  loadData(){
    if(!this.verifyScroll()){
      this.scroll.disabled = false
      this.newService.getTopHeadLinesByCategory(this.selectedCategory, true)
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


