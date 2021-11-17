import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseSections, ResponseArticles, Section } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl
const API_KEY = environment.apiKey

const params = new HttpParams().set('api-key', API_KEY)

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headlinesPage = 0;
  selectedSection: Section;
  limit = 20;
  offset = 0;

  constructor(private http: HttpClient) { }

  getSections() {
    return this.http.get<ResponseSections>(`${API_URL}/news/v3/content/section-list.json`, { params })
  }

  getArticlesBySection(data: Section) {
    if (!this.selectedSection || this.selectedSection.section !== data.section) {
      this.offset = 0
      this.selectedSection = data;
    } else {
      this.offset += this.limit;
    }

    const currentParams = params
      .set('limit', this.limit)
      .set('offset', this.offset)

    return this.http.get<ResponseArticles>(`${API_URL}/news/v3/content/all/${this.selectedSection.section}.json`, { params: currentParams })
  }
}
