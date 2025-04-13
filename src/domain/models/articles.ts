export interface Article {
  id_articulo: number;
  titulo: string;
  contenido: string;
  imagen_principal: string;
  fecha_publicacion?: string;
}

export type FormPostArticle = Omit<Article,'id_articulo' | 'fecha_publicacion'> & {
  id_categoria: number;
};