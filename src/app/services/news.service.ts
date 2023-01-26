import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, articleByCategoryAndPage, articlesByCategoryAndPage, NewsResponse } from '../interfaces';

const apiKey = environment.apiKey

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http: HttpClient
  ) { }

  getTopHeadlines(): Observable<articleByCategoryAndPage>{
    // return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=business`,{
    //   params: {
    //     apiKey: apiKey
    //   }
    // })

    return this.getArticlesByCategory('business')
  }

  getTopHeadLinesByCategory( category: string, loadMore: boolean = false): Observable<articleByCategoryAndPage>{

    if(loadMore){
      return this.getArticlesByCategory(category)
    }

    if(this.articlesByCategoryAndPage[category]){
      return of(this.articlesByCategoryAndPage[category])
    }

    return this.getArticlesByCategory(category)
  }

  private getArticlesByCategory(category: string): Observable<articleByCategoryAndPage>{
    if(Object.keys(this.articlesByCategoryAndPage).includes(category)){

    }else{
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: [],
        totalResults: 0
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
      map(({articles, totalResults}) => {

        if(articles.length == 0) return this.articlesByCategoryAndPage[category]

        this.articlesByCategoryAndPage[category] = {
          page: page,
          articles: [...this.articlesByCategoryAndPage[category].articles, ...articles],
          totalResults: totalResults
        }
        return this.articlesByCategoryAndPage[category]
      })
    )
  }

  articlesByCategoryAndPage: articlesByCategoryAndPage = {}

}
