import { Component, Input } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, ToastController, ActionSheetButton } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { Article, Multimedia } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  @Input() article: Article;
  @Input() index: number;
  @Input() isFavorite: boolean;

  constructor(
    private iab: InAppBrowser,
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocalService: DataLocalService,
    private toastController: ToastController,
  ) { }

  openArticle() {
    this.iab.create(this.article.url, '_system')
  }

  async showMenu() {
    let toogleFavorite: ActionSheetButton = {
      text: 'Favorite',
      icon: 'star',
      handler: async () => {
        this.dataLocalService.addFavoriteArticle(this.article)
        const toast = await this.toastController.create({
          message: 'Added article to favorites.',
          duration: 2000
        })

        toast.present()
      }
    }

    if (this.isFavorite) {
      toogleFavorite = {
        text: 'Remove favorite',
        icon: 'trash',
        handler: async () => {
          this.dataLocalService.removeFavoriteArticle(this.article)
          const toast = await this.toastController.create({
            message: 'Removed article from favorites.',
            duration: 2000
          })

          toast.present()
        }
      }
    }

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
        toogleFavorite,
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ]
    })

    await actionSheet.present();
  }

  getImage(multimedia: Multimedia[]) {
    const [photo] = [...multimedia].sort((a, b) => b.width - a.width)
    return photo.url
  }
}
