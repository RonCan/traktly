import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ScrollmediaComponent} from '../components/scrollmedia/scrollmedia.component';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        ScrollmediaComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        IonicModule.forRoot(),
        FlexLayoutModule
    ],
    exports: [
        FlexLayoutModule,
        ScrollmediaComponent,
        RouterModule
    ]
})
export class SharedModule {
}
