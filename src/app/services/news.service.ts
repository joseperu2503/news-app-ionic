import { HttpClient, HttpParams } from '@angular/common/http';
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

    let params = new HttpParams()
    params = params.append('apiKey', apiKey)
    params = params.append('page', page)
    if(category !== 'all'){
      params = params.append('category', category)
    }

    return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us`,{
      params: params
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

  articleSelected: Article = {
    source: {
        id: "cnn",
        name: "CNN"
    },
    author: "Manu Raju, Melanie Zanona, Lauren Fox",
    title: "Kevin McCarthy and House GOP weigh debt ceiling demands ahead of Biden meeting - CNN",
    description: "Speaker Kevin McCarthy and his House GOP allies are hashing out their initial demands to raise the national debt limit, discussing steep cuts to domestic programs and a trim to defense spending -- all the while steering clear of two programs to avoid voter bl…",
    url: "https://www.cnn.com/2023/01/30/politics/debt-limit-negotiations-republicans/index.html",
    urlToImage: "https://media.cnn.com/api/v1/images/stellar/prod/230130130724-01-kevin-mccarthy-0130.jpg?c=16x9&q=w_800,c_fill",
    publishedAt: new Date("2023-01-30T23:34:00Z"),
    content: "Speaker Kevin McCarthy and his House GOP allies are hashing out their initial demands to raise the national debt limit, discussing steep cuts to domestic programs and a trim to defense spending all t… [+9027 chars]"
  }

}
