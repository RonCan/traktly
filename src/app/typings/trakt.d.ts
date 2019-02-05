export interface Movie {
    title: string;
    year: number;
    ids: {
        trakt: number,
        slug: string,
        imdb: string,
        tmdb: number
    };
}

export interface TrendingMovie {
    watchers: number;
    movie: Movie;
}

export interface TrendingMovies extends Array<TrendingMovie> {
}

export interface PopularMovies extends Array<Movie> {
}

export interface RelatedMovies extends Array<Movie> {
}
