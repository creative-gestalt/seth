import { Injectable } from '@angular/core';

const sqlite = require('nativescript-sqlite');

@Injectable()
export class DatabaseExercisesPractice {

    private db: any;
    private isInstantiated: boolean;

    constructor() {
        // if (sqlite.exists('mainVault.sqlite')) {
        sqlite.copyDatabase('exercises.sqlite');
        // }
        if (!this.isInstantiated) {
            (new sqlite('exercises.sqlite')).then((db) => {
                db.execSQL('CREATE TABLE IF NOT EXISTS exercises (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, directions TEXT, book TEXT)').then((id) => {
                    this.db = db;
                    // this.isInstantiated = true;
                    console.log('exercises table was created');
                }, (error) => {
                    console.log('CREATE DB TABLE ERROR', error);
                });
            }, (error) => {
                console.log('OPEN DB ERROR', error);
            }).then((db) => {
                this.db.execSQL('CREATE TABLE IF NOT EXISTS practice (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, directions TEXT, book TEXT)').then((id) => {
                    console.log('practice table was created');
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
        return this.db.execSQL('INSERT INTO exercises (name, directions) VALUES (?, ?)', [data.name, data.directions]);
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
                        if (rows.hasOwnProperty(row)) {
                            exercises.push({
                                id: rows[row][0],
                                name: rows[row][1],
                                directions: rows[row][2],
                                book: rows[row][3]
                            });
                        }
                    }
                    resolve(exercises);
                }, (error) => {
                    reject(error);
                });
        });
    }

    fetchExercises(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM exercises ORDER BY id').then((rows) => {
                const exercises = [];
                for (const row in rows) {
                    if (rows.hasOwnProperty(row)) {
                        exercises.push({
                            id: rows[row][0],
                            name: rows[row][1],
                            directions: rows[row][2],
                            book: rows[row][3]
                        });
                    }
                }
                resolve(exercises);
            }, (error) => {
                reject(error);
            });
        });
    }

    fetchPracticeElements(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM practice ORDER BY id').then((rows) => {
                const practice = [];
                for (const row in rows) {
                    if (rows.hasOwnProperty(row)) {
                        practice.push({
                            id: rows[row][0],
                            name: rows[row][1],
                            directions: rows[row][2],
                            book: rows[row][3]
                        });
                    }
                }
                resolve(practice);
            }, (error) => {
                reject(error);
            });
        });
    }

}
