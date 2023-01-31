import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';
import { ShareService } from 'src/app/services/share.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  constructor(
    private newsService: NewsService,
    private router: Router,
    private shareService: ShareService,
    private storageService: StorageService
  ) { }

  article: Article
  isFavorite: boolean = false

  ngOnInit() {
    this.article = this.newsService.articleSelected
  }

  ionViewWillEnter(){
    this.article = this.newsService.articleSelected
    this.verifyFavorite()

  }

  verifyFavorite(){
    this.isFavorite = this.storageService.articleInFavorite(this.article)
  }

  back(){
    this.router.navigate(['tabs/tab2'], {replaceUrl: false})
  }

  share(){
    this.shareService.shareArticle(this.article)
  }

  async onToggleFavorite(){
    await this.storageService.saveRemoveArticle(this.article)
    this.verifyFavorite()
  }

}
