import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Girls } from './girls.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Girls>;

@Injectable()
export class GirlsService {

    private resourceUrl =  SERVER_API_URL + 'api/girls';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(girls: Girls): Observable<EntityResponseType> {
        const copy = this.convert(girls);
        return this.http.post<Girls>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(girls: Girls): Observable<EntityResponseType> {
        const copy = this.convert(girls);
        return this.http.put<Girls>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<Girls>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Girls[]>> {
        const options = createRequestOption(req);
        return this.http.get<Girls[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Girls[]>) => this.convertArrayResponse(res));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Girls = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Girls[]>): HttpResponse<Girls[]> {
        const jsonResponse: Girls[] = res.body;
        const body: Girls[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Girls.
     */
    private convertItemFromServer(girls: Girls): Girls {
        const copy: Girls = Object.assign({}, girls);
        copy.expirationDate = this.dateUtils
            .convertDateTimeFromServer(girls.expirationDate);
        return copy;
    }

    /**
     * Convert a Girls to a JSON which can be sent to the server.
     */
    private convert(girls: Girls): Girls {
        const copy: Girls = Object.assign({}, girls);

        copy.expirationDate = this.dateUtils.toDate(girls.expirationDate);
        return copy;
    }
}
