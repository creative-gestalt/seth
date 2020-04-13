import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';
import { NativeScriptFormsModule } from 'nativescript-angular';
import { SavedRoutingModule } from './saved-routing.module';

import { SavedComponent } from './saved.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SavedRoutingModule,
        NativeScriptUIListViewModule,
        NativeScriptFormsModule,
        CommonModule
    ],
    declarations: [
        SavedComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SavedModule { }
