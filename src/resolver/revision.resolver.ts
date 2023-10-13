import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Revision } from '../types/revision';
import { inject } from '@angular/core';
import { CguService } from 'src/services/cgu.service';

export const revisionResolver: ResolveFn<Revision | undefined> = (route: ActivatedRouteSnapshot) => {
    return inject(CguService).getRevision(+route.params['id']);
};
