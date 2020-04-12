import { Injectable } from '@angular/core';
const sqlite = require('nativescript-sqlite');

@Injectable()
export class DatabaseSaved {

    private db: any;
    private isInstantiated: boolean;

    constructor() {
        if (!sqlite.exists('customVault.sqlite')) {
            sqlite.copyDatabase('customVault.sqlite');
            console.log('CustomVault was created');
        }
        if (!this.isInstantiated) {
            (new sqlite('customVault.sqlite')).then((db) => {
                db.execSQL('CREATE TABLE IF NOT EXISTS custom (id INTEGER PRIMARY KEY AUTOINCREMENT, substance TEXT, dose TEXT, frequency TEXT, day TEXT, color TEXT, notes TEXT)').then((id) => {
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

    getByWeekday(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM custom WHERE days LIKE (?) ORDER BY substance', ['%' + data.days + '%'])
                .then((rows) => {
                    const substances = [];
                    for (const row in rows) {
                        substances.push({
                            id: rows[row][0],
                            substance: rows[row][1],
                            dose: rows[row][2],
                            frequency: rows[row][3],
                            days: rows[row][4],
                            color: rows[row][5],
                            notes: rows[row][6]
                        });
                    }
                    resolve(substances);
                }, (error) => {
                    reject(error);
                });
        });
    }

    getById(data: any) {
        return this.db.get('SELECT * FROM custom WHERE id = (?)', [data.id], (error, row) => {
            if (error) {
                console.log('ERROR GETTING ROW');
            } else {
                return row;
            }
        });
    }

    insert(data: any): Promise<any> {
        return this.db.
        execSQL('INSERT INTO custom (substance, dose, frequency, days, color, notes) VALUES (?, ?, ?, ?, ?, ?)',
            [data.substance, data.dose, data.frequency, data.days, data.color, data.notes]);
    }

    delete(data: any): Promise<any> {
        return this.db.
            execSQL('DELETE FROM custom WHERE id = (?)', [data.id], (error) => {
                if (error) {
                    console.log('ERROR DELETING ROW');
                }
        });
    }

    update(data: any): Promise<any> {
        return this.db.
            execSQL('UPDATE custom SET substance = (?), dose = (?), frequency = (?), days = (?), color = (?) WHERE id = (?)',
            [data.substance, data.dose, data.frequency, data.days, data.color, data.id]);
    }

    updateNote(data: any): Promise<any> {
        return this.db.
            execSQL('UPDATE custom SET notes = (?) WHERE id = (?)', [data.notes, data.id]);
    }

    getNote(data: any) {
        return this.db.get('SELECT notes FROM custom WHERE id = (?)', [data.id], (error, row) => {
            if (error) {
                console.log('ERROR GETTING ROW');
            } else {
                return row;
            }
        });
    }

    fetch(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM custom ORDER BY substance').then((rows) => {
                const substances = [];
                for (const row in rows) {
                    substances.push({
                        id: rows[row][0],
                        substance: rows[row][1],
                        dose: rows[row][2],
                        frequency: rows[row][3],
                        days: rows[row][4],
                        color: rows[row][5],
                        notes: rows[row][6]
                    });
                }
                resolve(substances);
            }, (error) => {
                reject(error);
            });
        });
    }

}
