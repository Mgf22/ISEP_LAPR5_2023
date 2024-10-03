import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/user/user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GeralGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
    ) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let acesso : boolean = false;
    if (localStorage.getItem('token')) {
      this.userService.getCurrentUserRole().subscribe((role) => {

        if(role.role == "GestorFrota" || role.role == "GestorUtilizadores" || role.role == "GestorCampus" || role.role == "Utente" || role.role === "GestorTarefas"){
            acesso = true;
            return;
        }else {
            this.router.navigate(["login"])
            alert('Acesso negado!');
            acesso = false;
            return;
        }
      }) 
    }
    return acesso ? true : false;
  }
};