import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'watchlist',
                children: [
                    {
                        path: '',
                        loadChildren: '../tab-watchlist/watchlist.module#WatchlistPageModule'
                    }
                ]
            },
            {
                path: 'movies',
                children: [
                    {
                        path: '',
                        loadChildren: '../tab-movies/movies.module#MoviesModule'
                    }
                ]
            },
            {
                path: 'tv',
                children: [
                    {
                        path: '',
                        loadChildren: '../tab-tv/tv.module#TVModule'
                    }
                ]
            },
            {
                path: 'discover',
                children: [
                    {
                        path: '',
                        loadChildren: '../tab-discover/tab-discover.module#TabDiscoverPageModule'
                    },
                    {
                        path: 'movie/:id',
                        loadChildren: '../moviedetail/moviedetail.module#MoviedetailPageModule'
                    },
                    {
                        path: 'person/:id',
                        loadChildren: '../person-detail/person-detail.module#PersonDetailPageModule'
                    }
                ]
            },
            {
                path: 'stats',
                children: [
                    {
                        path: '',
                        loadChildren: '../tab-stats/tab-stats.module#TabStatsPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/watchlist',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/watchlist',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
