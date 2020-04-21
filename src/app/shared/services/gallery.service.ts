import { Injectable } from '@angular/core';
import * as fs from 'tns-core-modules/file-system';
declare const android: any;

@Injectable({
    providedIn: 'root'
})
export class GalleryService {
    targetFolder: fs.Folder;
    targetFolderString: string;

    constructor() {
        this.targetFolder = fs.Folder.fromPath(fs.path.join(android.os.Environment.getExternalStoragePublicDirectory(
            android.os.Environment.DIRECTORY_DCIM).getAbsolutePath(), 'seth'));

        this.targetFolderString = fs.path.join(android.os.Environment.getExternalStoragePublicDirectory(
            android.os.Environment.DIRECTORY_DCIM).getAbsolutePath(), 'seth');
    }
}
