import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'cgu-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    imports: [CommonModule, RouterModule, MatSidenavModule, MatListModule],
    standalone: true,
})
export class LayoutComponent {
    public readonly links = [
        { title: 'List', path: '/revision' },
        { title: 'Editor', path: '/revision/1' },
    ];
}
