import { CUSTOM_ELEMENTS_SCHEMA, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import '@github/markdown-toolbar-element';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'markdown-editor',
    templateUrl: './markdown-editor.component.html',
    styleUrls: ['./markdown-editor.component.scss'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA], //to allow the use of markdown-toolbar-element
    imports: [FormsModule, TextFieldModule, MatIconModule, MatButtonModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MarkdownEditorComponent),
            multi: true,
        },
    ],
    standalone: true,
})
export class MarkdownEditorComponent implements ControlValueAccessor {
    //to allow multiple textarea on the same screen, need to set an uniqueId for the textarea
    public readonly controlId = `MarkdownEditor-${Math.floor(100000 * Math.random())}`;

    public value = '';
    public disabled = false;
    public onChange = (_value: string) => {};
    public onTouched = () => {};

    public writeValue(value: string): void {
        this.value = value;
    }

    public registerOnChange(onChange: (_value: string) => {}): void {
        this.onChange = onChange;
    }

    public registerOnTouched(onTouched: () => {}): void {
        this.onTouched = onTouched;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    public setTouched(): void {
        this.onTouched();
    }
}
