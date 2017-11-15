import { UserService } from '../../common/services/user.service';
import { User } from '../../common/models/user';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    user: User;

/*     constructor(private userService: UserService) { 
        console.log("Home Controller");
    } */
    
    constructor() {
        
    }
    ngOnInit(): void {
        console.log("HomeController > getUser()");
        //this.userService.getUser().subscribe(user => this.user = user );
    }
}
