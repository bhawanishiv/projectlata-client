import { Injectable } from "@angular/core";
import { AngularFireDatabase, QueryFn } from '@angular/fire/database';
import { switchMap, map, mapTo, toArray } from 'rxjs/operators';
import { GenService } from './gen.service';
import { Instance } from '../models/instance.model';
import { Observable, Subject, BehaviorSubject, of, merge, from, concat, combineLatest } from 'rxjs';
import { IamService } from './iam.service';
@Injectable({
    providedIn: 'root'
})
export class InstanceService {
    instanceSubject: BehaviorSubject<Instance>;
    constructor(
        private afdb: AngularFireDatabase,
        private iamService: IamService,
        private gen: GenService) {
        this.instanceSubject = new BehaviorSubject<Instance>(null);
    }
    setCurrentInstance(instance: Instance) {
        this.instanceSubject.next(instance);
    }
    get currentInstance$() {
        return this.instanceSubject.asObservable();
    }

    get(instanceId: string): Observable<Instance> {
        return this.afdb.object<Instance>(`instances/${instanceId}`).snapshotChanges()
            .pipe(map(instance => this.gen.getValue<Instance>(instance, 'instanceId')));
    }

    getInstancesByOwner(ownerUid: string) {
        return this.getAll(ref => ref.orderByChild('ownerUid').equalTo(ownerUid))
    }

    getInstancesByIam(uid: string) {
        return this.iamService.getIAMs(ref => ref.orderByChild('uid').equalTo(uid)).pipe(map(iams => {
            if (iams.length > 0) return iams.map(iam => this.get(iam.instanceId));
            return of(null);
        })).pipe(switchMap(iams => combineLatest(iams)))
    }

    getOwnership(instanceId: string, uid: string) {
        return this.getInstancesByOwner(uid).pipe(map(instances => {
            let __instances = instances.filter(x => x.instanceId == instanceId);
            if (__instances !== undefined && __instances.length > 0) return __instances[0];
            return null;
        }))
    }

    create(instance: Instance) {
        return this.afdb.list<Instance>('instances').push(instance);
    }
    delete(instanceId: string) {
        return this.afdb.object(`instances/${instanceId}`).remove();
    }

    private getAll(queryFn?: QueryFn): Observable<Instance[]> {
        return this.afdb.list<Instance>('instances', queryFn).snapshotChanges()
            .pipe(map(instances => this.gen.getValues<Instance>(instances, 'instanceId')))
    }
}