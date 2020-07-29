import { Directive, HostListener } from "@angular/core";
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Directive({
    selector: 'navToBack, [navToBack]',
    exportAs: 'navToBack',
    host: {
        'class': 'asdas'
    }
})
export class NgpNavToBack {
    constructor(private breadcrumb: BreadcrumbService) {
    }

    @HostListener('click', ['$event.target'])
    onClick(btn) {
        this.breadcrumb.navToBack()
    }
}