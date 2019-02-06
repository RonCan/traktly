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

export interface HistoryMovieItem {
    id: number;
    watched_at: string;
    action: 'scrobble' | string;
    type: string;
    movie: Movie;
}

export interface HistoryMovies extends Array<HistoryMovieItem> {

}

export interface TraktTokenRequestBody {
    code: string;
    client_id: string;
    client_secret: string;
    redirect_uri: string;
    grant_type: 'authorization_code';
}

export interface TraktTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    created_at: number;
}
