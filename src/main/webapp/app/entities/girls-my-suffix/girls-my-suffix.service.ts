import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { GirlsMySuffix } from './girls-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<GirlsMySuffix>;

@Injectable()
export class GirlsMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/girls';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(girls: GirlsMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(girls);
        return this.http.post<GirlsMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(girls: GirlsMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(girls);
        return this.http.put<GirlsMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<GirlsMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<GirlsMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<GirlsMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<GirlsMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: GirlsMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<GirlsMySuffix[]>): HttpResponse<GirlsMySuffix[]> {
        const jsonResponse: GirlsMySuffix[] = res.body;
        const body: GirlsMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to GirlsMySuffix.
     */
    private convertItemFromServer(girls: GirlsMySuffix): GirlsMySuffix {
        const copy: GirlsMySuffix = Object.assign({}, girls);
        copy.expirationDate = this.dateUtils
            .convertDateTimeFromServer(girls.expirationDate);
        return copy;
    }

    /**
     * Convert a GirlsMySuffix to a JSON which can be sent to the server.
     */
    private convert(girls: GirlsMySuffix): GirlsMySuffix {
        const copy: GirlsMySuffix = Object.assign({}, girls);

        copy.expirationDate = this.dateUtils.toDate(girls.expirationDate);
        return copy;
    }
}
