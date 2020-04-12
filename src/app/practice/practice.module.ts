import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { PracticeRoutingModule } from './practice-routing.module';
import { PracticeComponent } from './practice.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PracticeRoutingModule
    ],
    declarations: [
        PracticeComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PracticeModule { }
