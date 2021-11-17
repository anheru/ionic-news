interface ResponseApi<T> {
  status: string;
  copyright: string;
  num_results: number;
  results: T
}

export interface ResponseArticles extends ResponseApi<Article[]> {}

export interface Article {
  slug_name: string;
  section: string;
  subsection: string;
  title: string;
  abstract: string;
  url: string;
  byline: string;
  item_type: string;
  source: string;
  updated_date: string;
  created_date: string;
  published_date: string;
  first_published_date: string;
  material_type_facet: string;
  kicker: string;
  subheadline: string;
  des_facet: string[];
  org_facet?: any;
  per_facet?: string[];
  geo_facet?: string[];
  related_urls?: any;
  multimedia?: Multimedia[];
  thumbnail_standard?: string;
}

export interface Multimedia {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
}

export interface ResponseSections extends ResponseApi<Section[]> { }

export interface Section {
  section: string;
  display_name: string;
}
