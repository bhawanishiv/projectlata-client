import { Directive, Input } from "@angular/core";

@Directive({
    selector: `ngPButton, ngp-button, [ngpButton]`,
    host: {
        'class': 'btn',
        '[class.btn__primary]': `color==="primary"`,
        '[class.btn__secondary]': `color==="secondary"`,
        '[class.btn__tertiary]': `color==="tertiary"`,
    }
})
export class NgPButton {
    @Input() color: 'primary' | 'secondary' | 'tertiary' = 'primary';
}