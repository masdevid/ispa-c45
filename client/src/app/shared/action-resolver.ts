import { MatSnackBar } from "@angular/material/snack-bar";
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { BaseApiService } from "../services/base-api.service";
import { BaseCrudService } from "../services/base-crud.service";

export class ActionResolver<T> implements Resolve<T>{
    constructor(
        public router:  Router,
        public service: BaseCrudService<T>,
        public sb: MatSnackBar
    ) {

    }

    previousUrl(state: RouterStateSnapshot){
      const splited = state.url.split('/');
      return splited.splice(0, splited.length-1).join('/')
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        const previousUrl = this.previousUrl(state);
        const id = route.queryParamMap.get('id');
        if(!id) return Promise.resolve({});
        return this.default(id, previousUrl)
    }

    async default(id, previousUrl){
        try {
            const data = await this.getById(id)
            if (!data) {
                this.sb.open('id tidak ditemukan');
                return this.router.navigateByUrl(previousUrl);
            }
            return data;
        } catch (err: any) {
            this.sb.open(err.error.message);
            return this.router.navigateByUrl(previousUrl);
        }
    }
    getById(id){
        return this.service.getById(id)
    }
}
