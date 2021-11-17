import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/interfaces';
import { ApiService } from '../../services/api.service';
import { map, tap } from 'rxjs/operators';
import { Section } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  articles: Article[] = [];
  sections$: Observable<Section[]>;
  selectedSection: Section

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchSections()
  }

  fetchSections() {
    this.sections$ = this.apiService.getSections()
      .pipe(
        map(response => response.results),
        tap(results => { 
          this.selectedSection = results[0]
          this.fetchArticles()
        }),
      )
  }
  
  fetchArticles(event?) {
    this.apiService
      .getArticlesBySection(this.selectedSection)
      .subscribe(response => {
        if (event) {
          event.target.complete()
        }

        if (!response.results) {
          event.target.disabled = true
          return;
        }

        this.articles = this.articles.concat(response.results)
      })
  }

  segmentChanged(data: CustomEvent<{value: Section}>) {
    this.selectedSection = data.detail.value
    this.articles = []
    this.fetchArticles()
  }
}
 