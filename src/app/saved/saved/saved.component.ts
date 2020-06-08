import { Component, OnInit, ViewChild } from '@angular/core';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { DatabaseSaved } from '~/app/shared/databases/database-saved';
import { Saved } from '~/app/saved/interfaces/saved.interface';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { AnimationCurve } from 'tns-core-modules/ui/enums';
import { View } from 'tns-core-modules/ui/core/view/view';
import { Page } from 'tns-core-modules/ui/page';
import * as app from 'tns-core-modules/application';
import * as utils from 'tns-core-modules/utils/utils';

@Component({
    selector: 'Saved',
    templateUrl: './saved.component.html'
})
export class SavedComponent implements OnInit {
    enabled: boolean;
    actionBar: number;
    cardElevation: number;
    sheetElevation: number;
    buttonElevation: number;
    newQuoteText: string;
    animationDuration: number;
    animateIn = AnimationCurve.cubicBezier(.43, .31, .12, .99);
    animateOut = AnimationCurve.easeOut;
    @ViewChild('fadeLayer', {static: false}) fadeLayer;
    @ViewChild('newDock', {static: false}) newDock;

    private _saved: ObservableArray<Saved>;

    constructor(
        private _savedQuotes: DatabaseSaved,
        private _page: Page
    ) {
    }

    get saved(): ObservableArray<Saved> {
        return this._saved;
    }

    ngOnInit(): void {
        this.enabled = false;
        this.actionBar = 4;
        this.cardElevation = 2;
        this.sheetElevation = 7;
        this.buttonElevation = 6;
        this.animationDuration = 350;
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

    // Loads new entry dock off screen
    onNewDockLoaded(args): void {
        this.newDock = <View>args.object;
        this.newDock.translateY = 500;
        this.newDock.opacity = 0;
        this.fadeLayer.nativeElement.isPassThroughParentEnabled = true;
        this.fadeLayer.nativeElement.opacity = 0;
    }

    // When user taps new button, this brings the new entry dock up
    onNewDock(newDock): void {
        this.enabled = true;
        this.fadeLayer.nativeElement.isPassThroughParentEnabled = false;
        this.fadeLayer.nativeElement.animate({opacity: 1, duration: this.animationDuration});
        newDock.animate({
            translate: {x: 0, y: 0},
            opacity: 1,
            duration: this.animationDuration,
            curve: this.animateIn
        });
    }

    // When the user hits save, this triggers saving to the database
    onNewNotify(message, newDock): void {
        this.fadeLayer.nativeElement.isPassThroughParentEnabled = true;
        this.fadeLayer.nativeElement.animate({opacity: 0, duration: this.animationDuration});
        if (message === 'saved') {
            newDock.animate({
                translate: {x: 0, y: 500},
                opacity: 0,
                duration: this.animationDuration,
                curve: this.animateOut
            });
            utils.ad.dismissSoftInput();
            this._savedQuotes.fetchSavedQuotes().then((results) => {
                this._saved = results;
            });
        } else {
            newDock.animate({
                translate: {x: 0, y: 500},
                opacity: 0,
                duration: this.animationDuration,
                curve: this.animateOut
            });
            utils.ad.dismissSoftInput();
        }
        setTimeout(() => {
            this.enabled = false;
        }, 350);
    }

    onTouchWhileDock(newDock): void {
        this.fadeLayer.nativeElement.isPassThroughParentEnabled = true;
        this.fadeLayer.nativeElement.animate({opacity: 0, duration: this.animationDuration});
        if (newDock.translateY === 0) {
            newDock.animate({
                translate: {x: 0, y: 500},
                opacity: 0,
                duration: this.animationDuration,
                curve: this.animateOut
            });
            utils.ad.dismissSoftInput();
            setTimeout(() => {
                this.enabled = false;
            }, 350);
        }
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
