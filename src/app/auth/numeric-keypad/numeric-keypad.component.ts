import { Component, OnInit, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-numeric-keypad',
  templateUrl: './numeric-keypad.component.html',
  styleUrls: ['./numeric-keypad.component.scss']
})
export class NumericKeypadComponent implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
  }

  onClick(number: any, element?: any) {
    if (String(number) !== '<') {
      console.log(number);
      const numberinputs = document.querySelectorAll('.numberinput');
      for (const key in numberinputs) {
        console.log(key);
      }
    }
  }

}


// $(function () {
// 	$(".content").click(function () {

// 		var value = $(this).find(".number").text();

// 		if (value !== "<") {
// 			$(".numberinput").each(function () {
// 				var a = $(this).hasClass("nocircle");
// 				if (!a) {
// 					$(this).addClass("nocircle");
// 					return false;
// 				}
// 			});
// 		} else {
// 			$($(".numberinput").get().reverse()).each(function () {
// 				var a = $(this).hasClass("nocircle");
// 				if (a) {
// 					$(this).removeClass("nocircle");
// 					return false;
// 				}
// 			});
// 		}
// 	});
// });
