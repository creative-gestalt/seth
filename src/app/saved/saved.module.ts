import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { SavedRoutingModule } from './saved-routing.module';
import { SavedComponent } from './saved.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SavedRoutingModule
    ],
    declarations: [
        SavedComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SavedModule { }
