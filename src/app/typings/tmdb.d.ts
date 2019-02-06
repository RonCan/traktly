export interface TMDBImageObject {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1: string | null;
    vote_average: number;
    vote_count: number;
    width: number;
}

export interface TMDBImageResult {
    posters: [TMDBImageObject];
}

export interface TMDBMovie {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: string | null;
    budget: number;
    genres: [
        { id: number, name: string }
        ];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: [
        { id: number, logo_path: string, name: string, origin_country: string }
        ];
    production_countries: [
        { iso_3166_1: string, name: string }
        ];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: [
        { iso_639_1: string, name: string }
        ];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface TMDBCredits {
    id: number;
    cast: [{
        cast_id: number;
        character: string;
        credit_id: string;
        gender: number | null;
        id: number;
        name: string;
        order: string;
        profile_path: string | null;
    }];
    crew: [{
        credit_id: string;
        department: string;
        gender: number | null;
        id: number | null;
        job: string;
        name: string;
        profile_path: string | null;
    }];
}

export interface TMDBPeopleImages {
    id: number;
    profiles: [TMDBImageObject];
}

export interface TMDBMovieBrief {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: 271110;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    popularity: number;
}

export interface TMDBRecommendedMovies {
    page: number;
    results: TMDBMovieBrief[];
    total_pages: number;
    total_results: number;
}

export interface TMDBPerson {
    birthday: string;
    known_for_department: string;
    deathday: null | string;
    id: number;
    name: string;
    also_known_as: string[];
    gender: number;
    biography: string;
    popularity: number;
    place_of_birth: string;
    profile_path: string;
    adult: boolean;
    imdb_id: string;
    homepage: null | string;
}

export interface TMDBPersonMovieCredits {
    'cast': [
        {
            character: string;
            credit_id: string;
            poster_path: string;
            id: number;
            video: boolean;
            vote_count: number;
            adult: boolean;
            backdrop_path: string;
            genre_ids: number[];
            original_language: string;
            original_title: string;
            popularity: string;
            title: string;
            vote_average: number;
            overview: string;
            release_date: string;
        }];
    crew: [{
        id: number;
        department: string;
        original_language: string;
        original_title: string;
        job: string;
        overview: string;
        vote_count: number;
        video: boolean;
        release_date: string;
        vote_average: number;
        title: string;
        popularity: number;
        genre_ids: string[];
        backdrop_path: string;
        adult: boolean;
        poster_path: string;
        credit_id: string;
    }];
}
