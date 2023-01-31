import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ArticleComponent } from './article/article.component';
import { ArticlesComponent } from './articles/articles.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    ArticleComponent,
    ArticlesComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ArticlesComponent,
    HeaderComponent
  ]
})
export class ComponentsModule { }
