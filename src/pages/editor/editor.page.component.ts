import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import '@github/markdown-toolbar-element';
import { MarkdownEditorComponent } from '../../components/markdown-editor/markdown-editor.component';
import { MarkdownViewerComponent } from '../../components/markdown-viewer/markdown-viewer.component';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Data } from '@angular/router';
import { Revision } from 'src/types/revision';
import { map } from 'rxjs';

@Component({
    selector: 'editor-page',
    templateUrl: './editor.page.component.html',
    styleUrls: ['./editor.page.component.scss'],
    imports: [MatCardModule, FormsModule, MarkdownViewerComponent, MarkdownEditorComponent],
    standalone: true,
})
export class EditorPageComponent implements OnInit {
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly destroyRef = inject(DestroyRef);

    public cgu = '';
    ngOnInit() {
        this.activatedRoute.data
            .pipe(
                map((data: Data) => data['revision'] as Revision),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe(revision => {
                this.cgu = revision.content;
            });
    }
}
