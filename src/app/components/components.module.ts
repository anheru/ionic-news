import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './articles/articles.component'
import { ArticleComponent } from './article/article.component'


@NgModule({
  declarations: [
    ArticlesComponent,
    ArticleComponent
  ],
  exports: [
    ArticlesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
