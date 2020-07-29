import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { AppUser } from '../models/auth';
import { Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AccountService } from './account.service';
import * as firebase from 'firebase';
@Injectable({
    providedIn: 'root'
})

export class AuthService {
    user$: Observable<firebase.User>;
    constructor(
        private auth: AngularFireAuth,
        private db: AngularFirestore,
        private router: Router,
        private accountService: AccountService) {
        this.user$ = this.auth.authState;
    }

    login(username: string, password: string) {
        return this.auth.signInWithEmailAndPassword(username, password);
    }
    logout() {
        this.auth.signOut()
        this.router.navigate(['/']);
    }

    get appUser$(): Observable<AppUser> {
        return this.user$.pipe(switchMap(user => {
            if (!user) return of(null)
            return this.accountService.get(user.uid)
        }));
    }
    async signup(email: string, password: string) {
        return this.auth.createUserWithEmailAndPassword(email, password);
    }
}