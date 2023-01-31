import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { Browser } from '@capacitor/browser';
import { ActionSheetController } from '@ionic/angular';
import { Share } from '@capacitor/share';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() article: Article
  @Input() index: number
  constructor(
    private actionSheetCtrl: ActionSheetController,
    private storageService: StorageService,
    private router: Router,
    private newsService: NewsService
  ) { }

  ngOnInit() {}

  async onOpenMenu(){

    const articleInFavorite = this.storageService.articleInFavorite(this.article)

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Compartir',
          icon: 'share-outline',
          handler: () => this.onShareArticle()
        },
        {
          text: articleInFavorite ? 'Remover favorito' : 'Favorito',
          icon: articleInFavorite ? 'heart' : 'heart-outline',
          handler: () => this.onToggleFavorite()
        }
      ]
    })

    await actionSheet.present()
  }

  async openArticle(){
    await Browser.open({ url: this.article.url });
  }

  async onShareArticle(){
    await Share.share({
      title: 'See cool stuff',
      text: this.article.title,
      url: this.article.url,
      dialogTitle: 'Comparte con amigos!'
    });
  }

  onToggleFavorite(){
    this.storageService.saveRemoveArticle(this.article)
  }

  enterArticle(){
    this.newsService.articleSelected = this.article
    this.router.navigate(['/tabs/new'])
  }

}
