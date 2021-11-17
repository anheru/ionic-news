import { Component, OnInit, Input } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { Article, Multimedia } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;
  @Input() index: number;
  @Input() isFavorite: boolean;

  constructor(
    private iab: InAppBrowser,
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocalService: DataLocalService,
  ) { }

  ngOnInit() {}

  openArticle() {
    this.iab.create(this.article.url, '_system')
  }

  async showMenu() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Share',
          icon: 'share-social',
          handler: () => {
            this.socialSharing.share(
              this.article.title,
              this.article.title,
              null,
              this.article.url
            )
          }
        },
        {
          text: 'Favorite',
          icon: 'star',
          handler: () => {
            this.dataLocalService.addFavoriteArticle(this.article)
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => { }
        },
      ]
    })

    await actionSheet.present();
  }

  getImage(multimedia: Multimedia[]) {
    const [photo] = multimedia.sort((a, b) => b.width - a.width)
    return photo.url
  }
}
