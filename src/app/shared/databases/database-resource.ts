import { Injectable } from '@angular/core';
const sqlite = require('nativescript-sqlite');

@Injectable()
export class DatabaseResource {

    private db: any;
    private isInstantiated: boolean;

    constructor() {
        // if (sqlite.exists('resources.sqlite')) {
        sqlite.copyDatabase('resources.sqlite');
        console.log('Resources was created');
        // }
        if (!this.isInstantiated) {
            (new sqlite('resources.sqlite')).then((db) => {
                db.execSQL('CREATE TABLE IF NOT EXISTS resources (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, source TEXT)').then((id) => {
                    this.db = db;
                    this.isInstantiated = true;
                }, (error) => {
                    console.log('CREATE DB TABLE ERROR', error);
                });
            }, (error) => {
                console.log('OPEN DB ERROR', error);
            });
        }
    }

    getById(data: any) {
        return this.db.get('SELECT * FROM resources WHERE id = (?)', [data.id], (error, row) => {
            if (error) {
                console.log('ERROR GETTING ROW');
            } else {
                return row;
            }
        });
    }

    fetch(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM resources ORDER BY name').then((rows) => {
                const resources = [];
                for (const row in rows) {
                    resources.push({
                        id: rows[row][0],
                        name: rows[row][1],
                        source: rows[row][2]
                    });
                }
                resolve(resources);
            }, (error) => {
                reject(error);
            });
        });
    }

}
