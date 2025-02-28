import {Component, OnInit} from '@angular/core';
import {SupabaseService} from '../../services/supabase.service';
import {Router} from '@angular/router';
import {User} from '@supabase/supabase-js';

@Component({
  selector: 'app-setting',
  imports: [],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent implements OnInit {
  user: User|null = null;
  imageUrl: string = 'assets/images/default-image.png'; // Initial image URL
  defaultImageUrl: string = 'assets/images/default-image.png'; // Path to your local fallback image

  constructor(private supabaseService:SupabaseService,private router: Router) {
  }

  ngOnInit() {
   this.supabaseService.getUser().then((data) => {
     this.user = data.data.user
     this.imageUrl= this.user?.user_metadata.image_url;
   })
  }

  logoutUser() {
    this.supabaseService.signOut().then(()=>{
      this.router.navigate(['login']);
    })
  }

  setDefaultImage() {
    console.log("hello")
    this.imageUrl = this.defaultImageUrl
    // this.user?.user_metadata.avatar_url = this.defaultImageUrl;
  }
}
