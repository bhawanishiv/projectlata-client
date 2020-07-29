import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { GenService } from './gen.service';
import { map } from 'rxjs/operators';
import { Reading, PinReading } from '../models/instance.model';
import { Observable } from 'rxjs';
import { Pin } from '../models/cpu.model';

@Injectable({
  providedIn: 'root'
})
export class ReadingService {

  constructor(
    private afdb: AngularFireDatabase,
    private gen: GenService) { }

  getAll(instanceId: string) {
    return this.afdb.list(`readings/${instanceId}`).snapshotChanges()
      .pipe(map(readings => this.gen.getValues(readings)
        .map(reading => this.gen.convertToArrayInsideObject(reading, 'pinNo'))
      ));
  }
  getByPinNo(instanceId: string, pinNo: string) {
    return this.afdb.list<Reading>(`readings/${instanceId}/${pinNo}`).snapshotChanges().pipe(map(response => this.gen.getValues(response)));
  }
  removeAll(instanceId: string) {
    return this.afdb.object(`readings/${instanceId}`).remove();
  }
}
