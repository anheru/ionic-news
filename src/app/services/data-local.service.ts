import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Article } from '../interfaces/interfaces';

const ARTICLE_STORAGE = 'favorite-articles';
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  articles: Article[] = [];

  constructor() { }

  async addFavoriteArticle(article: Article) {
    const exists = this.articles.find(a => a.title === article.title)
    if (exists) { return; }

    this.articles = [].concat(article, this.articles)
    Storage.set({
      key: ARTICLE_STORAGE,
      value: JSON.stringify(this.articles)
    })
  }

  async removeFavoriteArticle(article: Article) {
    this.articles = this.articles.filter(a => a.title !== article.title)

    Storage.set({
      key: ARTICLE_STORAGE,
      value: JSON.stringify(this.articles)
    })
  }

  async loadFavorieArticles() {
    const articleList = await Storage.get({ key: ARTICLE_STORAGE })
    this.articles = JSON.parse(articleList.value) || [];
  }
}
