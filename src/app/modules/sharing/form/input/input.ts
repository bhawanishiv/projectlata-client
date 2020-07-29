import { Component, Input, Directive, ViewChild, AfterContentInit, HostListener } from "@angular/core";

@Directive({
    selector: `label[ngpLabel]`,
    host:{'class':'form__label'}
})
export class NgpLabel {

}

@Directive({
    selector: `input[ngpInput], select[ngpInput], textarea[ngpInput]`,
    host: { 'class': 'form__input' }
})
export class NgpInput {

}

@Directive({
    selector: 'ngdForm',

    host: {
        'class': 'form__group'
    }
})
export class NgpForm{
 
}