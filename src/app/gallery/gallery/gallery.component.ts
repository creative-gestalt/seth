import { Component, OnInit, ViewChild } from '@angular/core';
import { getNumber, setNumber } from 'tns-core-modules/application-settings';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { GalleryService } from '~/app/shared/services/gallery.service';
import { ImageData } from '~/app/gallery/interfaces/image.interface';
import { RouterExtensions } from 'nativescript-angular/router';
import { ImageSource } from 'tns-core-modules/image-source';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import * as fs from 'tns-core-modules/file-system';
import { ActivatedRoute } from '@angular/router';
import * as camera from 'nativescript-camera';
import { ImageCropper } from 'nativescript-imagecropper';

@Component({
    selector: 'Camera',
    templateUrl: './gallery.component.html'
})
export class GalleryComponent implements OnInit {
    actionBar: number;
    fileNumber: number;
    cardElevation: number;
    buttonElevation: number;
    imageSource: ImageSource;
    gallery: ObservableArray<ImageData>;

    @ViewChild('list', {static: false}) list;

    constructor(
        private _gallery: GalleryService,
        private _router: RouterExtensions,
        private _activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.actionBar = 4;
        this.cardElevation = 2;
        this.buttonElevation = 6;
        this.checkPermissions();
        // this.clearGallery();
        // this.getFolderContents();
    }

    getFolderContents(): void {
        const folder = this._gallery.targetFolder;
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
                    const imageSource = result;

                    const imageCropper = new ImageCropper();
                    imageCropper.show(imageSource).then((args) => {
                        console.log(args);
                        if (args.image !== null) {
                            this.imageSource = args.image;

                            const folderPath = this._gallery.targetFolderString;
                            if (getNumber('fileNumber') === undefined) {
                                setNumber('fileNumber', 0);
                            }
                            const fileName = `SETH_PIC_${getNumber('fileNumber')}.jpg`;
                            const newFile = fs.path.join(folderPath, fileName);
                            this.imageSource.saveToFile(newFile, 'jpg');

                            this.gallery.push({
                                name: fileName,
                                path: newFile,
                                lastModified: null
                            });

                            setNumber('fileNumber', getNumber('fileNumber') + 1);
                            this.list.listView.refresh();

                            console.log(newFile);
                        }
                    }).catch((error) => {
                        console.log(error);
                    });
                });
            }).catch((err) => {
            console.log('Error -> ' + err.message);
        });
    }

    checkPermissions(): void {
        camera.isAvailable();
        camera.requestPermissions().then(() => {
            console.log('Request was accepted');
        }, (failure) => {
            console.log(failure);
        });
    }

    populateGallery(): void {
        this.gallery = new ObservableArray<ImageData>([]);
        const folder = this._gallery.targetFolder;
        setTimeout(() => {
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
                }).catch((error) => {
                console.log(error);
            });
            this.list.listView.refresh();
        }, 200);
    }

    clearGallery(): void {
        const folder = this._gallery.targetFolder;
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
