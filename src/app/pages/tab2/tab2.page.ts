import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
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

  segmentChange(event: any){
    console.log(event.detail.value)
    this.selectedCategory = event.detail.value
    this.newService.getTopHeadLinesByCategory(this.selectedCategory)
    .subscribe( articles => {
      this.articles = articles
    })
  }

  articles: Article[] = []

  ngOnInit(){
    this.newService.getTopHeadLinesByCategory(this.selectedCategory)
    .subscribe( articles => {
      this.articles = articles
    })
  }

  loadData(event: any){
    this.newService.getTopHeadLinesByCategory(this.selectedCategory, true)
    .subscribe( articles => {
      this.articles = articles
      event.target.complete()
    })
  }

}
