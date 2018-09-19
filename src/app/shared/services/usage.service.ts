import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HomeScore } from '../models/home-score';
import { DailyUsage } from '../models/daily-usage';
@Injectable({
    providedIn: 'root',
})
export class UsageService {
    private baseUrl = `https://stg-garcon.herokuapp.com/api/1/`;
    private cachedScore: {
        id: string,
        homeScore: HomeScore
    }[] = [];
    constructor(private http: HttpClient) { }

    // Caching score API since this value wont really change in the system
    getScore(accountNum: string): Observable<HomeScore> {
        // look for cached score
        const cachedAccountScore = this.cachedScore.find((item => {
            return item.id === accountNum;
        }));
        // return cached value if exists
        if (cachedAccountScore) {
            return of(cachedAccountScore.homeScore);
        } else {
            // make API call if it doesnt exist
            return this.http.get(`${this.baseUrl}accounts/homescore/${accountNum}/summary`)
                .pipe(map(res => {
                    // Store response to the cache
                    this.cachedScore.push({
                        id: accountNum,
                        homeScore: res as HomeScore
                    });
                    return this.cachedScore.find(item => {
                        return item.id === accountNum;
                    }).homeScore;
                }));
        }
    }

    getDailyUsage(accountNum: string): Observable<DailyUsage> {
        return this.http.get(`${this.baseUrl}accounts/homescore/${accountNum}/energy/usage/daily`)
            .pipe(map(res => {
                return res as DailyUsage;
            }));
    }

    // Assuming account 2 is also average usage
    getAverageUsage(): Observable<DailyUsage> {
        return this.http.get(`${this.baseUrl}accounts/homescore/2/energy/usage/daily`)
            .pipe(map(res => {
                return res as DailyUsage;
            }));
    }

    // Assuming account 1 is also ideal usage
    getIdealUsage(): Observable<DailyUsage> {
        return this.http.get(`${this.baseUrl}accounts/homescore/1/energy/usage/daily`)
            .pipe(map(res => {
                return res as DailyUsage;
            }));
    }
}
