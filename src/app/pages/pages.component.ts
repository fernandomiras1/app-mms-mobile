import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(private router: Router,
              public activatedRoute:ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      localStorage.setItem('id', data.idEntidad);
    });
  }

  public logoutUser(): void {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

}
