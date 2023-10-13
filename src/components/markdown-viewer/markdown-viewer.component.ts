import { Component, Input } from '@angular/core';
import '@github/markdown-toolbar-element';
import { MarkdownModule } from 'ngx-markdown';

@Component({
    selector: 'markdown-viewer',
    templateUrl: './markdown-viewer.component.html',
    styleUrls: ['./markdown-viewer.component.scss'],
    imports: [MarkdownModule],
    standalone: true,
})
export class MarkdownViewerComponent {
    @Input() public rawText = '';
}
