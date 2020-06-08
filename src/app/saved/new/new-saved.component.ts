import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { DatabaseSaved } from '~/app/shared/databases/database-saved';

@Component({
    selector: 'new-saved',
    templateUrl: './new-saved.component.html'
})
export class NewSavedComponent implements OnInit {
    quote: string;
    book: string;
    actionBar: number;
    buttonElevation: number;
    @Output() notify: EventEmitter<string> = new EventEmitter<string>();

    constructor(
        private _saved: DatabaseSaved
    ) {
    }

    ngOnInit(): void {
        this.actionBar = 4;
        this.buttonElevation = 6;
    }

    onLoaded(): void {
        this.quote = '';
        this.book = '';
    }

    onSave(quote, book): void {
        this._saved.insert({quote, book}).then(() => {
            this.notify.emit('saved');
        });
    }

    onCancel(): void {
        this.notify.emit('canceled');
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
