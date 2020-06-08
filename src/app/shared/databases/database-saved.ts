import { Injectable } from '@angular/core';
const sqlite = require('nativescript-sqlite');

@Injectable()
export class DatabaseSaved {

    private db: any;
    private isInstantiated: boolean;

    constructor() {
        if (!sqlite.exists('saved.sqlite')) {
            sqlite.copyDatabase('saved.sqlite');
            console.log('saved was created');
        }
        if (!this.isInstantiated) {
            (new sqlite('saved.sqlite')).then((db) => {
                db.execSQL('CREATE TABLE IF NOT EXISTS saved (id INTEGER PRIMARY KEY AUTOINCREMENT, quote TEXT, book TEXT)').then((id) => {
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
        return this.db.get('SELECT * FROM saved WHERE id = (?)', [data.id], (error, row) => {
            if (error) {
                console.log('ERROR GETTING ROW');
            } else {
                return row;
            }
        });
    }

    insert(data: any): Promise<any> {
        return this.db.execSQL('INSERT INTO saved (quote, book) VALUES (?, ?)', [data.quote, data.book]);
    }

    delete(data: any): Promise<any> {
        return this.db.
            execSQL('DELETE FROM saved WHERE id = (?)', [data.id], (error) => {
                if (error) {
                    console.log('ERROR DELETING ROW');
                }
        });
    }

    update(data: any): Promise<any> {
        return this.db.
            execSQL('UPDATE saved SET quote = (?) WHERE id = (?)',
            [data.quote,  data.id]);
    }

    fetchSavedQuotes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM saved ORDER BY id DESC').then((rows) => {
                const quotes = [];
                for (const row in rows) {
                    if (rows.hasOwnProperty(row)) {
                        quotes.push({
                            id: rows[row][0],
                            quote: rows[row][1],
                            book: rows[row][2]
                        });
                    }
                }
                resolve(quotes);
            }, (error) => {
                reject(error);
            });
        });
    }

}
