import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';
import { NativeScriptFormsModule } from 'nativescript-angular';
import { SavedRoutingModule } from './saved-routing.module';
import { CommonModule } from '@angular/common';

import { SavedComponent } from './saved/saved.component';
import { NewSavedComponent } from '~/app/saved/new/new-saved.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SavedRoutingModule,
        NativeScriptUIListViewModule,
        NativeScriptFormsModule,
        CommonModule
    ],
    declarations: [
        SavedComponent,
        NewSavedComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SavedModule { }
