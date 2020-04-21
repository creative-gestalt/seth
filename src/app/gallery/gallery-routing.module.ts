import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { GalleryComponent } from '~/app/gallery/gallery/gallery.component';
import { PictureComponent } from '~/app/gallery/picture/picture.component';

const routes: Routes = [
    { path: '', redirectTo: 'gallery', pathMatch: 'full' },
    { path: 'gallery', component: GalleryComponent },
    { path: 'picture', component: PictureComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class GalleryRoutingModule { }
