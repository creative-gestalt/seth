import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/search', pathMatch: 'full' },
    { path: 'search', loadChildren: () => import('~/app/search/search.module')
            .then((m) => m.SearchModule) },
    { path: 'exercises', loadChildren: () => import('~/app/exercises/exercises.module')
            .then((m) => m.ExercisesModule) },
    { path: 'practice', loadChildren: () => import('~/app/practice/practice.module')
            .then((m) => m.PracticeModule) },
    { path: 'saved', loadChildren: () => import('~/app/saved/saved.module')
            .then((m) => m.SavedModule) },
    { path: 'gallery', loadChildren: () => import('~/app/gallery/gallery.module')
            .then((m) => m.GalleryModule) },
    { path: 'about', loadChildren: () => import('~/app/about/about.module')
            .then((m) => m.AboutModule) },
    { path: 'settings', loadChildren: () => import('~/app/settings/settings.module')
            .then((m) => m.SettingsModule) },
    { path: 'shared', loadChildren: () => import('~/app/shared/shared.module')
            .then((m) => m.SharedModule) }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
