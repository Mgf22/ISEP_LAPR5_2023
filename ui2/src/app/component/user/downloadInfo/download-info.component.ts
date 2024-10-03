import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { UserService } from '../../../service/user/user.service';
import { RoleService } from '../../../service/role/role.service';
import { Role } from '../../../model/role';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-download-info',
  templateUrl: './download-info.component.html',
  styleUrls: ['./download-info.component.css']
})
export class DownloadInfoComponent implements OnInit {
  email = "";

  constructor(
    private location: Location,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
  }

  /*downloadInfo() {
    let errorOrSuccess: any = this.userService.downloadInfo(this.email);
    errorOrSuccess.subscribe(
      (data: any) => {
      },

      (error: any) => {
        alert(error.error);
      }
    );

    return errorOrSuccess;
  }*/

  downloadInfo(){
    this.userService.downloadInfo().subscribe(response => {
      const contentDispositionHeader = response.headers.get('Content-Disposition');
      const fileName = contentDispositionHeader
        ? contentDispositionHeader.split(';')[1].trim().split('=')[1]
        : 'user.json';

      const blob = response.body;

      if (blob !== null) {
        // Use file-saver to save the blob as a file
        saveAs(blob, fileName);
      } else {
        // Handle the case when the response body is null
        console.error('The response body is null.');
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}