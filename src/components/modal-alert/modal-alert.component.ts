import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ModalAlertData } from 'src/types/modal-alert-data';

@Component({
    selector: 'modal-dialog',
    templateUrl: './modal-alert.component.html',
    styleUrls: ['./modal-alert.component.scss'],
    imports: [CommonModule, MatDialogModule, MatButtonModule],
    standalone: true,
})
export class ModalAlertComponent {
    public readonly data: ModalAlertData = inject(MAT_DIALOG_DATA);
}
