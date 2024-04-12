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
  selectedStudent: Student = { id: 0, name: '', username: '', email: '' };
  editingIndex : number = 0;


  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  editStudent(index: number): void {
    this.selectedStudent = { ...this.students[index] }; 
    this.editingIndex = index; 
  }
  
  cancelEdit(): void {
    this.selectedStudent = { id: 0, name: '', username: '', email: '' }; 
    this.editingIndex = -1; 
  }

  onEditSubmit(): void {
    if (this.selectedStudent.id !== 0) {
      this.putStudents(this.selectedStudent); //therritet funksioni putstudents
      this.cancelEdit(); 
    }
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
