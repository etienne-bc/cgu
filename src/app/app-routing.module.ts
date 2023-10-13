import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { revisionResolver } from '../resolver/revision.resolver';
import { revisionsResolver } from 'src/resolver/revisions.resolver';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'revision',
        pathMatch: 'full',
    },

    {
        path: 'revision',
        loadComponent: () => import('../pages/list/list.page.component').then(m => m.ListPageComponent),
        resolve: {
            revisions: revisionsResolver,
        },
    },

    {
        path: 'revision/:id',
        loadComponent: () => import('../pages/editor/editor.page.component').then(m => m.EditorPageComponent),
        resolve: {
            revision: revisionResolver,
        },
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
