# StudentApp
1. Krijo nje aplikacion te ri te quajtur student-app
ng new student-app
npm install
ng serve --open

2. Krijo nje komponent te ri te quajtur students
ng g c student

3.  Shto  komponentin e ri students tek komponenti AppComponent
 <app-student></app-student>

6. Krijo nje servis te ri quajtur Student
Folder i ri services ne app
ng g s Student 

7. Krijo nje interface te quajtur Student qe permban {id, name, email}
Folder i ri interfaces ne app
ng g i Student

8. Krijo nje metode tek servisi te quajtur getStudents per te marr listen me studenta -> https://jsonplaceholder.typicode.com/users
import { HttpClientModule } from '@angular/common/http'; ne modules
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../interfaces/student'; ne service
constructor(private http: HttpClient) { }
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

9. Therrisni metoden getStudents tek komponenti students
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../interfaces/student'; ne student component

10. Ndryshoni html tek komponenti ku te perdorni nje loop per te printuar te gjith studentet

11. Butoni delete kur e klikon te printoje mesazhin "Studenti u fshi"
 
-------------------------------------------------------------------------------------
1. Krijo metod postStudent, putStudent, deleteStudent

2. Support for nonexistent route

3. Shto fushen username tek tabela e studentit