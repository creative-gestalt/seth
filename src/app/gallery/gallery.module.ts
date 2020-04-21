import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';
import { NativeScriptFormsModule } from 'nativescript-angular';
import { GalleryRoutingModule } from './gallery-routing.module';
import { CommonModule } from '@angular/common';

import { GalleryComponent } from '~/app/gallery/gallery/gallery.component';
import { PictureComponent } from '~/app/gallery/picture/picture.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        GalleryRoutingModule,
        NativeScriptUIListViewModule,
        NativeScriptFormsModule,
        CommonModule
    ],
    declarations: [
        GalleryComponent,
        PictureComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class GalleryModule { }
