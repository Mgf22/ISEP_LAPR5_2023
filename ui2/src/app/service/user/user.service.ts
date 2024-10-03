import { Injectable } from '@angular/core';

import { Observable, map, of, switchMap } from 'rxjs';

import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../../model/user';
import { CreateUser } from '../../model/createUser';
import { AtualizarUtente } from '../../model/atualizarUtente';
import { IRole } from '../../model/IRole';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private LogisticAPI_URL = 'http://localhost:3000/api/users';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  criarUser(user: CreateUser) {
    const headers = {
      'content-type': 'application/json',
      'authorization': 'Bearer ' + localStorage.getItem("token"),
      'Access-Control-Allow-Origin': '*',
    };

    const body = JSON.stringify(user);
    return this.http.post<User>(this.LogisticAPI_URL + "/criarUser", body, { 'headers': headers, observe: 'response' })
  }

  login(email: string, password: string) {
    const loginUrl = this.LogisticAPI_URL + "/login/" + email + "/" + password;
    const login = this.http.get(loginUrl);
    return login;
  }

  deleteUser() {
    const headers = { 'authorization': 'Bearer ' + localStorage.getItem("token") };
    return this.http.delete(this.LogisticAPI_URL + "/deleteUser", { headers });
  }

  atualizarUser(utente: AtualizarUtente) {
    const updateURL = this.LogisticAPI_URL + "/updateUser";
    const headers = {
      'content-type': 'application/json',
      'authorization': 'Bearer ' + localStorage.getItem("token")
    };
    const body = JSON.stringify(utente);
    console.log(localStorage.getItem("token"));
    return this.http.put<AtualizarUtente>(updateURL, body, { 'headers': headers, observe: 'response' })
  }

  getUserInfo(): Observable<User> {
    const downloadUrl = this.LogisticAPI_URL + "/getUserByEmail";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<User>(downloadUrl, {headers})
  }

  getCurrentUserRole() : Observable<IRole> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<IRole>(this.LogisticAPI_URL + "/getCurrentUserRole", {headers});
  }


  downloadInfo(): Observable<HttpResponse<Blob>> {
    const downloadUrl = this.LogisticAPI_URL + "/getUserByEmail";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
  
    return this.http.get(downloadUrl, {
      headers: headers,
      observe: 'response',
      responseType: 'blob' // Important: Set the response type to 'blob'
    }).pipe(
      switchMap(response => {
        if (response.body instanceof Blob) {
          // Process the received Blob to remove 'id' and 'roleId' fields
          return this.removeIdAndRoleId(response.body).then(modifiedBlob => {
            return new HttpResponse<Blob>({
              body: modifiedBlob,
              headers: response.headers,
              status: response.status
            });
          }).catch(error => {
            // Handle any errors that occur during modification
            console.error('Error modifying Blob:', error);
            // Return the original response as fallback
            return new HttpResponse<Blob>({
              body: response.body,
              headers: response.headers,
              status: response.status
            });
          });
        } else {
          // Handle the case when response.body is not a Blob
          return of(new HttpResponse<Blob>({
            body: new Blob(),
            headers: response.headers,
            status: response.status
          }));
        }
      })
    );
  }
  
// Function to remove 'Id' and 'RoleId' properties from the received JSON and create a new Blob
removeIdAndRoleId(blob: Blob): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        const text = event.target.result.toString();
        try {
          const userInfo = JSON.parse(text);

          // Remove 'Id' and 'RoleId' properties
          delete userInfo.Id;
          delete userInfo.RoleId;

          // Convert the modified user info back to text
          const modifiedText = JSON.stringify(userInfo);

          // Create a new Blob with the modified text
          const modifiedBlob = new Blob([modifiedText], { type: 'application/json' });

          resolve(modifiedBlob); // Resolve the Promise with the modified blob
        } catch (error) {
          console.error("Error parsing JSON:", error);
          reject(error); // Reject the Promise if an error occurs
        }
      }
    };
    reader.readAsText(blob);
  });
}




}
