import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements OnInit {

  @Input('appAutofocus') focus = true;
  constructor(private el: ElementRef, private render: Renderer2) { }

  ngOnInit(): void {
    if (this.focus) {
      setTimeout(() => {
        this.render.selectRootElement(this.el.nativeElement).focus();
      });
    }
  }
}
