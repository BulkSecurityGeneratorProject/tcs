import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Work } from './work.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class WorkService {

    private resourceUrl = SERVER_API_URL + 'api/works';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(work: Work): Observable<Work> {
        const copy = this.convert(work);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(work: Work): Observable<Work> {
        const copy = this.convert(work);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Work> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Work.
     */
    private convertItemFromServer(json: any): Work {
        const entity: Work = Object.assign(new Work(), json);
        entity.date = this.dateUtils
            .convertLocalDateFromServer(json.date);
        return entity;
    }

    /**
     * Convert a Work to a JSON which can be sent to the server.
     */
    private convert(work: Work): Work {
        const copy: Work = Object.assign({}, work);
        copy.date = this.dateUtils
            .convertLocalDateToServer(work.date);
        return copy;
    }
}
