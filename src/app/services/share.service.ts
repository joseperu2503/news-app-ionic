import { Injectable } from '@angular/core';
import { Share } from '@capacitor/share';
import { Article } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(
  ) { }

  async shareArticle(article: Article){
    await Share.share({
      title: 'See cool stuff',
      text: article.title,
      url: article.url,
      dialogTitle: 'Comparte con amigos!'
    });
  }


}
