export type SimpleMovieType = {
  episode_id: number;
  title: string;
  release_date: string;
  release_year: number;
  plot?: string;
  director?: string;
  ratings?: PercentileRatingsType[];
  ratingAverage?: number;
  poster?: string;
};

export type ExportedMovieType = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
};

export type DetailsPerMovieType = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: [
    {
      Source: string;
      Value: string;
    },
    {
      Source: string;
      Value: string;
    },
    {
      Source: string;
      Value: string;
    },
  ];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

export type PercentileRatingsType = {
  source: string;
  value: number;
};

// export type ExportedMovieType = {
//             "count": 6,
//     "next": null,
//     "previous": null,
//     "results": []
// }
