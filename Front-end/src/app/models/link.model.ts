export interface LinkResponse {
  id: string;
  codigo: string;
  url_original: string;
  total_cliques: number;
  criado_em: string;
}

export interface LinkRequest {
  urlOriginal: string;
  codigo?: string;
}
