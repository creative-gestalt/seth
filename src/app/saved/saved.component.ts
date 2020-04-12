import { Component, OnInit } from '@angular/core';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { DatabaseSaved } from '~/app/shared/databases/database-saved';
import { Saved } from '~/app/saved/interfaces/saved.interface';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';

@Component({
    selector: 'Saved',
    templateUrl: './saved.component.html'
})
export class SavedComponent implements OnInit {

    get saved(): ObservableArray<Saved> {
        return this._saved;
    }

    private _saved: ObservableArray<Saved>;

    constructor(
        private _savedQuotes: DatabaseSaved
    ) {
    }

    ngOnInit(): void {
        this._savedQuotes.fetchSavedQuotes().then((results) => {
            this._saved = results;
            console.log(results);
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
