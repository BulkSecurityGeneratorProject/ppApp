import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PreferencesMySuffix } from './preferences-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PreferencesMySuffix>;

@Injectable()
export class PreferencesMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/preferences';

    constructor(private http: HttpClient) { }

    create(preferences: PreferencesMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(preferences);
        return this.http.post<PreferencesMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(preferences: PreferencesMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(preferences);
        return this.http.put<PreferencesMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<PreferencesMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PreferencesMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<PreferencesMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PreferencesMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PreferencesMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PreferencesMySuffix[]>): HttpResponse<PreferencesMySuffix[]> {
        const jsonResponse: PreferencesMySuffix[] = res.body;
        const body: PreferencesMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PreferencesMySuffix.
     */
    private convertItemFromServer(preferences: PreferencesMySuffix): PreferencesMySuffix {
        const copy: PreferencesMySuffix = Object.assign({}, preferences);
        return copy;
    }

    /**
     * Convert a PreferencesMySuffix to a JSON which can be sent to the server.
     */
    private convert(preferences: PreferencesMySuffix): PreferencesMySuffix {
        const copy: PreferencesMySuffix = Object.assign({}, preferences);
        return copy;
    }
}
