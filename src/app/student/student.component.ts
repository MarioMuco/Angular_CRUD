import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../interfaces/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit{

  students: Student[] = [];
  newStudent: Student = { id: 0, name: '',username : '', email: '' }; // Studenti i ri për të postuar
  editingIndex: number = -1; //-1 student is being edited

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(students => this.students = students);
  }

  postStudents() : void{
this.studentService.postStudents(this.newStudent)
      .subscribe(student => {
        this.students.push(student); // Shto studentin e ri në listën lokale
        this.newStudent = { id: 0, name: '',username : '', email: '' }; // Rikthe studentin e ri në gjendjen fillestare
      });
  }

  putStudents(student: Student): void {
    this.studentService.putStudents(student)
      .subscribe(updatedStudent => {
        // Gjej indeksin e studentit të ndryshuar në listën lokale
        const index = this.students.findIndex(s => s.id === updatedStudent.id);
        if (index !== -1) {
          // Nëse studenti është gjetur, zëvendësoje të dhënat e tij në listën lokale
          this.students[index] = updatedStudent;
        }
      });
  }

  deleteStudents(studentId: number): void {
    this.studentService.deleteStudents(studentId)
      .subscribe(() => {
        // Fshij studentin nga lista lokale
        this.students = this.students.filter(s => s.id !== studentId);
      });
  }

}
