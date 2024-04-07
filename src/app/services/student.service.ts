import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../interfaces/student'; // Importo interfejsin e Student

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl: string = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  postStudents(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  putStudents(student: Student): Observable<Student> {
    const url = `${this.apiUrl}/${student.id}`;
    return this.http.put<Student>(url, student);
  }

  deleteStudents(studentId: number): Observable<Student> {
    const url = `${this.apiUrl}/${studentId}`;
    return this.http.delete<Student>(url);
  }

}
