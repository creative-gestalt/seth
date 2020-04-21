import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import * as fs from 'tns-core-modules/file-system';
import { Page } from 'tns-core-modules/ui/page';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
declare const android: any;

@Component({
    selector: 'Picture',
    templateUrl: './picture.component.html'
})
export class PictureComponent implements OnInit {
    actionBar: number;
    cardElevation: number;
    buttonElevation: number;
    name: string;
    path: string;

    constructor(
        private _page: Page,
        private _router: RouterExtensions,
        private _activatedRoute: ActivatedRoute
    ) {
        this._activatedRoute.params.subscribe((params) => {
            this.name = params.name;
            this.path = params.path;
        });
    }

    ngOnInit(): void {
        this.actionBar = 4;
        this.cardElevation = 2;
        this.buttonElevation = 6;
    }

    onDelete(): void {
        const folder = fs.path.join(android.os.Environment.getExternalStoragePublicDirectory(
            android.os.Environment.DIRECTORY_DCIM).getAbsolutePath(), 'seth');

        const file = fs.File.fromPath(fs.path.join(folder, this.name));
        this.path = '';
        file.remove().then(
            () => {
                alert('Picture was deleted');
            }, (error) => {
                console.log('Error -> ' + error.message);
            }
        );
        this._router.back();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
