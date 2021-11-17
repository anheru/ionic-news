import { Component } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  articles: Article[];
  constructor(public dataLocalService: DataLocalService) {}

  async ngOnInit() {
    await this.dataLocalService.loadFavorieArticles()
  }
}
