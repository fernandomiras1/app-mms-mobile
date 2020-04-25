import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements OnInit {

  // private focus = true;

  constructor(private el: ElementRef){ }

  @Input() focus = true;

  ngOnInit() {
    if (this.focus) {
      console.log('ingresa');
      window.setTimeout(() => {
        this.el.nativeElement.focus();
      });
    }
  }
}