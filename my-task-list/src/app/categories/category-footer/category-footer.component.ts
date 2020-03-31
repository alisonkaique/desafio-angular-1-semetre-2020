import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from 'src/app/core/user/user';
import { UserService } from 'src/app/core/user/user.service';

@Component({
    selector: 'app-category-footer',
    templateUrl: './category-footer.component.html'
})
export class CategoryFooterComponent implements OnInit {

    user$: Observable<User>;

    constructor(private userService: UserService) {

    }

    ngOnInit(): void {
        this.user$ = this.userService.getUser();
    }
}