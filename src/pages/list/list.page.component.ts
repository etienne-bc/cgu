import { Component, DestroyRef, inject } from '@angular/core';
import '@github/markdown-toolbar-element';
import { ActivatedRoute, Data, RouterModule } from '@angular/router';
import { Revision } from 'src/types/revision';
import { filter, map, switchMap } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NthFirstCharsPipe } from 'src/pipes/nth-first-chars.pipe';
import { ModalService } from 'src/services/modal.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'editor-page',
    templateUrl: './list.page.component.html',
    styleUrls: ['./list.page.component.scss'],
    imports: [
        CommonModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        RouterModule,
        NthFirstCharsPipe,
        MatCheckboxModule,
    ],
    standalone: true,
})
export class ListPageComponent {
    private readonly modalService = inject(ModalService);
    private readonly destroyRef = inject(DestroyRef);

    public readonly displayedColumns = ['compare', 'date', 'content', 'actions'];
    public readonly revisions$ = inject(ActivatedRoute).data.pipe(map((data: Data) => data['revisions'] as Revision[]));

    private revisionToCompare: Revision[] = [];

    public isCompared(revision: Revision): boolean {
        return this.revisionToCompare.includes(revision);
    }

    public canCompare(): boolean {
        return this.revisionToCompare.length === 2;
    }

    public camparaisonEnabled(revision: Revision): boolean {
        return this.isCompared(revision) || !this.canCompare();
    }

    public toggleRevisionToCompare(revision: Revision): void {
        if (this.isCompared(revision)) {
            this.revisionToCompare = this.revisionToCompare.filter(r => r !== revision);
        } else {
            this.revisionToCompare.push(revision);
        }
    }

    public compare(): void {
        const alertData = {
            title: 'Comparaison de révision !',
            message: `Les révisions ${this.revisionToCompare[0].id} du ${this.revisionToCompare[0].date} et ${this.revisionToCompare[1].id} du ${this.revisionToCompare[1].date} seront comparées (bientôt WIP)`,
            confirmText: 'Cool',
        };

        this.modalService.alert(alertData).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    }

    public remove(revision: Revision): void {
        const confirmData = {
            title: 'Supprimer une revision ?',
            message: 'Êtes vous sûr de vouloir supprimer cette revision ?',
            confirmText: 'Supprimer',
            cancelText: 'Annuler',
        };

        const alertData = {
            title: 'Révision supprimée !',
            message: `La révision ${revision.id} du ${revision.date} a bien été supprimée. (ou presque WIP)`,
            confirmText: 'Cool',
        };

        this.modalService
            .confirm(confirmData)
            .pipe(
                filter(confirm => confirm),
                switchMap(() => this.modalService.alert(alertData)),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe();
    }
}
