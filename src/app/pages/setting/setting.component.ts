import {Component, OnInit} from '@angular/core';
import {SupabaseService} from '../../services/supabase.service';
import {Router} from '@angular/router';
import {Profile} from '../../interfaces/profile';
import {User, UserResponse} from '@supabase/supabase-js';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-setting',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent implements OnInit {
  user: User|null = null;
  constructor(private supabaseService:SupabaseService,private router: Router) {
  }

  ngOnInit() {
   this.supabaseService.getUser().then((data) => {
     this.user = data.data.user
     console.log(this.user)
   })
  }

  logoutUser() {
    this.supabaseService.signOut().then(()=>{
      this.router.navigate(['login']);
    })
  }
}
