import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, from, map, switchMap } from 'rxjs';
import { ModalConfirmData } from 'src/types/modal-confirm-data';
import { ModalAlertData } from 'src/types/modal-alert-data';

@Injectable({ providedIn: 'root' })
export class ModalService {
    private readonly dialog = inject(MatDialog);

    private readonly defaultConfirmModalData: ModalConfirmData = {
        title: 'Confirm',
        message: 'Are you sure ?',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
    };

    private readonly defaultDialogModalData: ModalAlertData = {
        title: 'Information',
        message: 'Pour votre information.',
        confirmText: 'Compris',
    };

    public confirm(confirmModalData: Partial<ModalConfirmData>): Observable<boolean> {
        const data: ModalConfirmData = {
            ...this.defaultConfirmModalData,
            ...confirmModalData,
        };

        return from(import('src/components/modal-confirm/modal-confirm.component')).pipe(
            map(({ ModalConfirmComponent }) => this.dialog.open(ModalConfirmComponent, { data })),
            switchMap(dialogRef => dialogRef.afterClosed()),
        );
    }

    public alert(dialogModalData: Partial<ModalAlertData>): Observable<void> {
        const data: ModalAlertData = {
            ...this.defaultDialogModalData,
            ...dialogModalData,
        };

        return from(import('src/components/modal-alert/modal-alert.component')).pipe(
            map(({ ModalAlertComponent }) => this.dialog.open(ModalAlertComponent, { data })),
            switchMap(dialogRef => dialogRef.afterClosed()),
        );
    }
}
