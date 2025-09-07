export interface Movie {
  _id:              string;
  fullplot:         string;
  imdb:             Imdb;
  plot:             string;
  genres:           string[];
  title:            string;
  languages:        string[];
  poster:           string;
  cast:             string[];
  directors:        string[];
  runtime:          number;
  previewLink:      string;
  alternatePoster:  string;
}



export interface Imdb {
  rating: number;
  votes:  number;
  id:     number;
}


export type Autocomplete  = Movie;

export type SemanticSearch = Movie;

export interface DiverseSearch {
    title:     Movie[];
    cast:      Movie[];
    directors: Movie[];
    genres:    Movie[];
}









