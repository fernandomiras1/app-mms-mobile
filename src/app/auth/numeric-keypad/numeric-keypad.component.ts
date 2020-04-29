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

  @HostListener('click') onClick() {
    let part = this.el.nativeElement.querySelector('.content .number');
    if (part) {

      // var value = part.find(".number").text();
      console.log('es el', part.text);
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
