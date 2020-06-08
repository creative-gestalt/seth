import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { SavedComponent } from './saved/saved.component';
import { NewSavedComponent } from '~/app/saved/new/new-saved.component';

const routes: Routes = [
    { path: '', redirectTo: 'saved', pathMatch: 'full' },
    { path: 'saved', component: SavedComponent },
    { path: 'new', component: NewSavedComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SavedRoutingModule { }
