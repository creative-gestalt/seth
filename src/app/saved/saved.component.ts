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
    actionBar: number;
    cardElevation: number;
    buttonElevation: number;
    newQuoteText: string;

    get saved(): ObservableArray<Saved> {
        return this._saved;
    }

    private _saved: ObservableArray<Saved>;

    constructor(
        private _savedQuotes: DatabaseSaved
    ) {
    }

    ngOnInit(): void {
        this.actionBar = 4;
        this.cardElevation = 2;
        this.buttonElevation = 6;
        this._savedQuotes.fetchSavedQuotes().then((results) => {
            this._saved = results;
        });
    }

    onEditQuote(oldQuoteText): void {
        this.newQuoteText = oldQuoteText;
    }

    onDeleteQuote(args): void {
        const id = args.object.bindingContext.id;
        this._savedQuotes.delete({id});
        this.saved.splice(this.saved.indexOf(args.object.bindingContext), 1);
    }

    onSaveQuote(args, newQuote): void {
        const id = args.object.bindingContext.id;
        this._savedQuotes.update({quote: newQuote, id});
        this._savedQuotes.fetchSavedQuotes().then((results) => {
            this._saved = results;
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
