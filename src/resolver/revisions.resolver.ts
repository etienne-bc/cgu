import { ResolveFn } from '@angular/router';
import { Revision } from '../types/revision';
import { inject } from '@angular/core';
import { CguService } from 'src/services/cgu.service';

export const revisionsResolver: ResolveFn<Revision[]> = () => inject(CguService).getRevisions();
