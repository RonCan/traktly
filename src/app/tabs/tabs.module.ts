import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {TabsPageRoutingModule} from './tabs.router.module';

import {TabsPage} from './tabs.page';
import {MoviedetailPageModule} from '../moviedetail/moviedetail.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TabsPageRoutingModule,
        MoviedetailPageModule
    ],
    declarations: [TabsPage]
})
export class TabsPageModule {
}
