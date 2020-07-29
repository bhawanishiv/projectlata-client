import { Component, ContentChild, AfterContentInit, TemplateRef, ViewChild, } from '@angular/core';
@Component({
    selector: 'ngp-box-footer',
    template: `<ng-template><ng-content></ng-content></ng-template>`
})
export class NgpBoxFooter {
    @ViewChild(TemplateRef, { static: true }) content: TemplateRef<any>;
}
@Component({
    selector: 'ngp-box-content',
    template: `<ng-template><ng-content></ng-content></ng-template>`
})
export class NgpBoxContent {
    @ViewChild(TemplateRef, { static: true }) content: TemplateRef<any>;

}


@Component({
    selector: 'ngp-box',
    templateUrl: 'box.html'
})
export class NgpBox implements AfterContentInit {

    @ContentChild(NgpBoxContent) main: NgpBoxContent;
    @ContentChild(NgpBoxFooter) footer!: NgpBoxFooter;
  
    ngAfterContentInit() {
    }
  }

