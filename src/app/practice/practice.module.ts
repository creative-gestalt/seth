import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { PracticeRoutingModule } from './practice-routing.module';

import { PracticeElementComponent } from '~/app/practice/practice-elements/practice-element.component';
import { DirectionsComponent } from '~/app/practice/directions/directions.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PracticeRoutingModule
    ],
    declarations: [
        PracticeElementComponent,
        DirectionsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PracticeModule { }
