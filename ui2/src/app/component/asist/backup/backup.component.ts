import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
})
export class BackupComponent {
  constructor(private router: Router) { }
}
