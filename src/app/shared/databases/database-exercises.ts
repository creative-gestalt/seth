import { Injectable } from '@angular/core';
const sqlite = require('nativescript-sqlite');

@Injectable()
export class DatabaseExercises {

    private db: any;
    private isInstantiated: boolean;

    constructor() {
        // if (sqlite.exists('mainVault.sqlite')) {
            sqlite.copyDatabase('exercises.sqlite');
            console.log('exercises was created');
        // }
            if (!this.isInstantiated) {
            (new sqlite('exercises.sqlite')).then((db) => {
                db.execSQL('CREATE TABLE IF NOT EXISTS exercises (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, directions TEXT, book TEXT)').then((id) => {
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

    insert(data: any): Promise<any> {
        return this.db.
        execSQL('INSERT INTO exercises (name, directions) VALUES (?, ?)', [data.name, data.directions]);
    }

    getById(data: any) {
        return this.db.get('SELECT * FROM exercises WHERE id = (?)', [data.id], (error, row) => {
            if (error) {
                console.log('ERROR GETTING ROW');
            } else {
                return row;
            }
        });
    }

    getByBook(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM exercises WHERE book LIKE (?) ORDER BY id', [data.book + '%'])
                .then((rows) => {
                const exercises = [];
                for (const row in rows) {
                    exercises.push({
                        id: rows[row][0],
                        name: rows[row][1],
                        directions: rows[row][2],
                        book: rows[row][3]
                    });
                }
                resolve(exercises);
                }, (error) => {
                reject(error);
            });
        });
    }

    // getByTag(data: any): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.db.all('SELECT * FROM substances WHERE tags LIKE (?) ORDER BY substance', ['%' + data.tags + '%'])
    //             .then((rows) => {
    //                 const substances = [];
    //                 for (const row in rows) {
    //                     substances.push({
    //                         id: rows[row][0],
    //                         substance: rows[row][1],
    //                         dose: rows[row][2],
    //                         description: rows[row][3],
    //                         type: rows[row][4],
    //                         tags: rows[row][5]
    //                     });
    //                 }
    //                 resolve(substances);
    //             }, (error) => {
    //                 reject(error);
    //             });
    //     });
    // }

    fetch(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM exercises ORDER BY id').then((rows) => {
                const exercises = [];
                for (const row in rows) {
                    exercises.push({
                        id: rows[row][0],
                        name: rows[row][1],
                        directions: rows[row][2],
                        book: rows[row][3]
                    });
                }
                resolve(exercises);
            }, (error) => {
                reject(error);
            });
        });
    }

}
