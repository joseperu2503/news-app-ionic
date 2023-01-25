import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, articlesByCategoryAndPage, NewsResponse } from '../interfaces';

const apiKey = environment.apiKey

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http: HttpClient
  ) { }

  getTopHeadlines(){
    return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=business`,{
      params: {
        apiKey: apiKey
      }
    })
  }

  getTopHeadLinesByCategory( category: string, loadMore: boolean = false): Observable<Article[]>{

    if(loadMore){
      return this.getArticlesByCategory(category)
    }

    if(this.articlesByCategoryAndPage[category]){
      return of(this.articlesByCategoryAndPage[category].articles)
    }

    return this.getArticlesByCategory(category)
  }

  private getArticlesByCategory(category: string): Observable<Article[]>{
    if(Object.keys(this.articlesByCategoryAndPage).includes(category)){

    }else{
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: []
      }
    }
    const page = this.articlesByCategoryAndPage[category].page + 1

    return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us`,{
      params: {
        apiKey: apiKey,
        category: category,
        page: page
      }
    }).pipe(
      map(({articles}) => {

        if(articles.length == 0) return this.articlesByCategoryAndPage[category].articles

        this.articlesByCategoryAndPage[category] = {
          page: page,
          articles: [...this.articlesByCategoryAndPage[category].articles, ...articles]
        }
        return this.articlesByCategoryAndPage[category].articles
      })
    )
  }

  articlesByCategoryAndPage: articlesByCategoryAndPage = {}

}
