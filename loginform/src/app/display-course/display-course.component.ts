import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 


interface Course {
  name: string;
  mentor: string;
  startDate: string;
  endDate: string;
  duration: number;
  rating: number;
  image: string | null;
  video: string | null;
  videoVisibility: boolean;
  imageUrl: string;
}

@Component({
  selector: 'app-display-course',
  templateUrl: './display-course.component.html',
  styleUrls: ['./display-course.component.css'],
  standalone: true,
  imports: [CommonModule] 
})
export class DisplayCourseComponent implements OnInit {
  courses: Course[] = []; 
  errorMessage: string | null = null;
  isLoading = false; 

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchCourses(); 
  }
  fetchCourses() {
    this.isLoading = true;
    this.errorMessage = null;
  
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      });
  
      this.http.get<Course[]>('http://localhost:3000/courses', { headers }).subscribe({
        next: (response: Course[]) => {
          this.courses = response.map(course => ({
            ...course,
            video : course.video ? `http://localhost:3000/${course.video}` : null,
            image : course.image ? `http://localhost:3000/${course.image}` : null,
            videoVisibility: false
          }));
          console.log(this.courses);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching courses', error);
          this.isLoading = false;
          this.errorMessage = 'Error fetching courses. Please try again later.';
        }
      });
    } else {
      this.isLoading = false;
      this.router.navigate(['/login']);
    }
  }
  logout() {
    console.log("User has logged out");

    // Clear any authentication data (example using localStorage)
    localStorage.removeItem('authToken');  // Assuming 'authToken' is used for user authentication

    // Redirect to the login page after logout
    this.router.navigate(['/login']);
  }
  back() {
    console.log("User has logged out");

    // Clear any authentication data (example using localStorage)
    localStorage.removeItem('authToken');  // Assuming 'authToken' is used for user authentication

    // Redirect to the login page after logout
    this.router.navigate(['/dashboard']);
  }
  
  toggleVideo(course: Course): void {
    course.videoVisibility = !course.videoVisibility; 
  }
}
