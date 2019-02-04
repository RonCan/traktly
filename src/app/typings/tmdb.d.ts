export interface MoviePosterImageType {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1: string | null;
    vote_average: number;
    vote_count: number;
    width: number;
}

export interface TMDBImageResult {
    posters: [MoviePosterImageType];
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
