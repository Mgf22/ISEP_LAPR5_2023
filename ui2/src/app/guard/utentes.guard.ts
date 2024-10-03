import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/user/user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UtenteGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
    ) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (localStorage.getItem('token')) {
      this.userService.getCurrentUserRole().subscribe((role) => {
        console.log('Role!: ' + role);
        if(role.role === 'Utente'){
            return true;
        }else {
        alert('Acesso negado!');
        this.router.navigate(['login']);
        return false;
      }
      }) 
    }

    this.router.navigate(['login']);
    return false;
  }
};