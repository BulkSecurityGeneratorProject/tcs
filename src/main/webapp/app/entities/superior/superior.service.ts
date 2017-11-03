import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Superior } from './superior.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SuperiorService {

    private resourceUrl = SERVER_API_URL + 'api/superiors';

    constructor(private http: Http) { }

    create(superior: Superior): Observable<Superior> {
        const copy = this.convert(superior);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(superior: Superior): Observable<Superior> {
        const copy = this.convert(superior);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Superior> {
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
     * Convert a returned JSON object to Superior.
     */
    private convertItemFromServer(json: any): Superior {
        const entity: Superior = Object.assign(new Superior(), json);
        return entity;
    }

    /**
     * Convert a Superior to a JSON which can be sent to the server.
     */
    private convert(superior: Superior): Superior {
        const copy: Superior = Object.assign({}, superior);
        return copy;
    }
}
