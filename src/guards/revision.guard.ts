import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { CguService } from 'src/services/cgu.service';
import { map } from 'rxjs';

export const revisionGuard: CanActivateFn = (route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
    return inject(CguService)
        .getRevision(+route.params['id'])
        .pipe(map(revision => !!revision));
};
