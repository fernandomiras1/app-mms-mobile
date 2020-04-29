import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-numeric-keypad',
  templateUrl: './numeric-keypad.component.html',
  styleUrls: ['./numeric-keypad.component.scss']
})
export class NumericKeypadComponent implements OnInit {

  constructor(private el: ElementRef) { }
  isClick: boolean = false;
  @Output() onNumberClick: EventEmitter<Object> = new EventEmitter<Object>();

  ngOnInit(): void {
  }
  onClick(number: any, isClick3?: boolean) {
    const numberinputs = document.querySelectorAll('.numberinput');
    if (String(number) !== '<') {
      this.onNumberClick.emit({ number, accion: 'add'});
      for (let index = 0; index < numberinputs.length; index++) {
        const element = numberinputs[index];
        if (!element.classList.contains('nocircle')) {
          element.classList.add('nocircle');
          break;
        }
      }

    } else {
      this.onNumberClick.emit({number, accion: 'delete'});
      const arr = [].slice.call(numberinputs, 0).reverse();
      for (let index = 0; index < arr.length; index ++) {
        const element = arr[index];
        console.log(index);
        if (element.classList.contains('nocircle')) {
          element.classList.remove('nocircle');
          break;
        }
      }

    }
  }

}
