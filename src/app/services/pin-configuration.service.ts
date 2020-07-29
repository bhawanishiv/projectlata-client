import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GenService } from './gen.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Pin } from '../models/cpu.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PinConfigurationService {

  constructor(private afdb: AngularFireDatabase,
    private gen: GenService) { }

  getCPUPConfiguration(cpuId: string): Observable<Pin[]> {
    return this.afdb.list<Pin>(`cpus/${cpuId}/description/pin_configuration`).snapshotChanges().pipe(map(config => this.gen.getValues<Pin>(config)));
  }

  get(instanceId: string, pinNo: string) {
    return this.afdb.list<Pin>(`pinDefinitions/${instanceId}`, ref => ref.orderByChild('pinNo').equalTo(pinNo)).snapshotChanges().pipe(map(config => this.gen.getValues<Pin>(config)));
  }

  getAll(instanceId: string) {
    return this.afdb.list<Pin>(`pinDefinitions/${instanceId}`).snapshotChanges()
      .pipe(map(configs => this.gen.getValues(configs)));
  }

  remove(instanceId: string, pinNo: string) {
    return this.afdb.list(`pinDefinitions/${instanceId}`, ref => ref.orderByChild('pinNo').equalTo(pinNo)).remove();
  }

  removeAll(instanceId: string) {
    return this.afdb.list<Pin>(`pinDefinitions/${instanceId}`).remove();
  }
  set(instanceId: string, configs: Pin[]) {
    return this.afdb.object(`pinDefinitions/${instanceId}`).set(configs)
  }
}
