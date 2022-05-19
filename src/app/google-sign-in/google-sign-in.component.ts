import { Component,  OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-google-sign-in',
  templateUrl: './google-sign-in.component.html',
  styleUrls: ['./google-sign-in.component.scss']
})
export class GoogleSignInComponent implements OnInit {

  
   
  constructor(private authService: AuthService) { }
    
  ngOnInit() {
    
  }

  signInWithGoogle(): void {
    const token = localStorage.getItem('token')!;
    // console.log(token);
    // console.log(GoogleLoginProvider.PROVIDER_ID);
    this.authService.googleSignIn(token).subscribe()
    
  }
    
}

