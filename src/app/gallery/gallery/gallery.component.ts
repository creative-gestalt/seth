import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import * as camera from 'nativescript-camera';
import { Image } from 'tns-core-modules/ui/image';
import { ImageAsset } from 'tns-core-modules/image-asset';
import { ImageSource } from 'tns-core-modules/image-source';
import * as fs from 'tns-core-modules/file-system';
import { ImageData } from '~/app/gallery/interfaces/image.interface';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { EventData } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { CameraPlus } from '@nstudio/nativescript-camera-plus';
import { getNumber, setNumber } from 'tns-core-modules/application-settings';

declare const android: any;

@Component({
    selector: 'Camera',
    templateUrl: './gallery.component.html'
})
export class GalleryComponent implements OnInit {
    actionBar: number;
    cardElevation: number;
    buttonElevation: number;
    imageSource: ImageSource;
    gallery: ObservableArray<ImageData>;
    fileNumber: number;
    DCIM: string;
    folderDCIM: fs.Folder;
    testDCIM: fs.Folder;

    @ViewChild('list', {static: false}) list;

    constructor(
        private _zone: NgZone,
        private _router: RouterExtensions,
        private _activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.DCIM = fs.path.join(android.os.Environment.getExternalStoragePublicDirectory(
            android.os.Environment.DIRECTORY_DCIM).getAbsolutePath(), 'seth');

        this.folderDCIM = fs.Folder.fromPath(fs.path.join(android.os.Environment.getExternalStoragePublicDirectory(
            android.os.Environment.DIRECTORY_DCIM).getAbsolutePath(), 'seth'));

        this.testDCIM = fs.Folder.fromPath(android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);

        this.actionBar = 4;
        this.cardElevation = 2;
        this.buttonElevation = 6;
        this.checkPermissions();
        // this.clearGallery();
        this.getFolderContents();
    }

    getFolderContents(): void {
        // console.log(this.testDCIM);
        const folder = this.folderDCIM;
        const folders = [];
        folder.getEntities()
            .then((entities) => {
                entities.forEach((entity) => {
                    folders.push({
                        name: entity.name,
                        path: entity.path,
                        lastModified: entity.lastModified.toString()
                    });
                });
                console.log(folders);
            }).catch((error) => {
            console.log(error);
        });
    }

    onLoaded(): void {
        console.log('loaded');
        this.populateGallery();
    }

    onTakePicture(): void {
        camera.takePicture({saveToGallery: false})
            .then((imageAsset) => {
                ImageSource.fromAsset(imageAsset).then((result) => {
                    this.imageSource = result;

                    const folderPath = this.DCIM;
                    if (getNumber('fileNumber') === undefined) {
                        setNumber('fileNumber', 0);
                    }
                    const fileName = `SETH_PIC_${getNumber('fileNumber')}.jpg`;
                    const newFile = fs.path.join(folderPath, fileName);
                    const saved = this.imageSource.saveToFile(newFile, 'jpg');

                    this.gallery.push({
                        name: fileName,
                        path: newFile,
                        lastModified: null
                    });

                    setNumber('fileNumber', getNumber('fileNumber') + 1);
                    this.list.listView.refresh();

                    console.log(saved);
                    console.log(newFile);

                });
            }).catch((err) => {
            console.log('Error -> ' + err.message);
        });
    }

    checkPermissions(): void {
        camera.requestPermissions().then(() => {
            console.log('Request was accepted');
        }, (failure) => {
            console.log(failure);
        });
    }

    populateGallery(): void {
        this.gallery = new ObservableArray<ImageData>([]);
        const folder = this.folderDCIM;
        folder.getEntities()
            .then((entities) => {
                entities.forEach((entity) => {
                    this.gallery.push({
                        name: entity.name,
                        path: entity.path,
                        lastModified: entity.lastModified.toString()
                    });
                });
                // console.log(this.gallery);
                this.gallery.sort((a, b) => a.lastModified > b.lastModified ? -1 : 1);
                this.list.listView.refresh();
            }).catch((error) => {
            console.log(error);
        });
    }

    clearGallery(): void {
        const folder = this.folderDCIM;
        folder.clear();
    }

    onPictureTap(args, name, path): void {
        this._router.navigate(['../picture', {name, path}],
            {
                transition: {
                    name: 'slide',
                    duration: 200
                },
                relativeTo: this._activatedRoute
            });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
