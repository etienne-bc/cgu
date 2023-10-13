import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ModalConfirmData } from 'src/types/modal-confirm-data';

@Component({
    selector: 'modal-confirm',
    templateUrl: './modal-confirm.component.html',
    styleUrls: ['./modal-confirm.component.scss'],
    imports: [CommonModule, MatDialogModule, MatButtonModule],
    standalone: true,
})
export class ModalConfirmComponent {
    public readonly data: ModalConfirmData = inject(MAT_DIALOG_DATA);
}
