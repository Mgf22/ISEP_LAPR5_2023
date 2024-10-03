import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mbco',
  templateUrl: './mbco.component.html',
})
export class MbcoComponent {
  constructor(private router: Router) { }
}
