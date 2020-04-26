import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() clicked: EventEmitter<number> = new EventEmitter();
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onClick() {
    this.clicked.emit();
  }

  public logoutUser(): void {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

}
