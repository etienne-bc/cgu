import { Pipe } from '@angular/core';

@Pipe({ name: 'nthFirstChars', standalone: true })
export class NthFirstCharsPipe {
    public transform(value: string, length = 10): string {
        if (!value) {
            return '';
        }
        if (value.length <= length) {
            return value;
        }
        return `${value.substring(0, length)}…`;
    }
}
