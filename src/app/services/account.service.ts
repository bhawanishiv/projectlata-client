import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { AppUser } from '../models/auth';
import { map, switchMap } from 'rxjs/operators';
import { GenService } from './gen.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { of, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    userAgreementRef = this.db.collection('userAgreements');
    userRolesRef = this.db.collection('userRoles');
    userInfoRef = this.db.collection('userInfos');

    constructor(private db: AngularFirestore,
        private afdb: AngularFireDatabase,
        private gen: GenService) { }


    save(uid: string, user: any) {
        return this.afdb.object(`users/${uid}`).update({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            agreement: user.agreement,
            roles: user.roles
        })
    }

    get(uid: string) {
        return this.afdb.object<AppUser>(`users/${uid}`).snapshotChanges()
            .pipe(map(appUSer => this.gen.getValue<AppUser>(appUSer, 'uid')));
    }

    findByEmail(email: string): Observable<AppUser> {
        return this.afdb.list<AppUser>('users', (ref) => ref.orderByChild('email').equalTo(email)).snapshotChanges()
            .pipe(map(appUsers => this.gen.getValues(appUsers, 'uid')))
            .pipe(switchMap(users => {
                if (users.length > 0) return this.get(users[0].uid);
                return of(null);
            }));
    }

}