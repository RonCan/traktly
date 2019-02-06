import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {PersonDetailPage} from './person-detail.page';
import {SharedModule} from '../shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: PersonDetailPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [PersonDetailPage]
})
export class PersonDetailPageModule {
}
