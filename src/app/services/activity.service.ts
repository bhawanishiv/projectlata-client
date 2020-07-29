import { Injectable } from '@angular/core';
import { GenService } from './gen.service';
import { AngularFireDatabase, QueryFn } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Activity } from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private afdb: AngularFireDatabase,
    private gen: GenService) { }

  get(activityId: string): Observable<Activity> {
    return this.afdb.object<Activity>(`activities/${activityId}`).snapshotChanges().pipe(map(config => this.gen.getValue(config, 'activityId')));
  }

  getAll(queryFn?: QueryFn) {
    return this.afdb.list<Activity>('activities', queryFn).snapshotChanges().pipe(map(config => this.gen.getValues(config, 'activityId')));
  }
}
