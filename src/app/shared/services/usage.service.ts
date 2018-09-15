import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HomeScore } from '../models/home-score';
import { DailyUsage } from '../models/daily-usage';
@Injectable({
    providedIn: 'root',
})
export class UsageService {
    private baseUrl = `https://stg-garcon.herokuapp.com/api/1/`;
    constructor(private http: HttpClient) { }

    // Tdod chagne any to type
    getScore(accountNum: string): Observable<HomeScore> {
        return this.http.get(`${this.baseUrl}accounts/homescore/${accountNum}/summary`)
            .pipe(map(res => {
                return res as HomeScore;
            }));
    }

    getDailyUsage(accountNum: string): Observable<DailyUsage> {
        return this.http.get(`${this.baseUrl}accounts/homescore/1/energy/usage/daily`)
            .pipe(map(res => {
                return res as DailyUsage;
            }));
    }
}
