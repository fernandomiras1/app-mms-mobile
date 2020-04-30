import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-numeric-keypad',
  templateUrl: './numeric-keypad.component.html',
  styleUrls: ['./numeric-keypad.component.scss']
})
export class NumericKeypadComponent implements OnInit {

  constructor() { }
  @Output() onNumberClick: EventEmitter<Object> = new EventEmitter<Object>();

  ngOnInit(): void {

  }

  @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
    if ((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode == 42) { //0-9 y * only
      this.onClick(event.key);
    } else if (event.key === 'Backspace') {
      console.log('atras');
      this.onClick('<');
    }
  }

  onClick(number: any) {
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
        if (element.classList.contains('nocircle')) {
          element.classList.remove('nocircle');
          break;
        }
      }

    }
  }

}
