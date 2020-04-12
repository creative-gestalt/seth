import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { isAndroid } from 'tns-core-modules/platform';

@Component({
    selector: 'Search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
    testText: string;
    source: string;

    constructor() {
        this.source = 'https://findingseth.com/q/';
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    getRequest() {
        // httpModule.getString('https://findingseth.com/q/space').then((response) => {
        //     const newResponse = response
        //     alert(newResponse);
        // });
        // httpModule.request({
        //     url: 'https://findingseth.com/q/space',
        //     method: 'GET'
        // }).then((response) => {
        //     alert(response.content.getElementById('data-content'));
        // });
    }

    onWebViewLoaded(webargs) {
        const webview = webargs.object;
        if (isAndroid) {
            webview.android.getSettings().setDisplayZoomControls(false);
        }
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
