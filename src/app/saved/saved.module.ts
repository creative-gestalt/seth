import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { SavedRoutingModule } from './saved-routing.module';
import { SavedComponent } from './saved.component';
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SavedRoutingModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        SavedComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SavedModule { }
