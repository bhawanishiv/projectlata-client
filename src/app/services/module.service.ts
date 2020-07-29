import { Injectable } from '@angular/core';
import { GenService } from './gen.service';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, QueryFn } from '@angular/fire/database';
import { CPU } from '../models/modules.model';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {


  constructor(
    private afdb: AngularFireDatabase,
    private gen: GenService) { }

  getCPU(cpuId: string) {
    return this.afdb.object<CPU>(`cpus/${cpuId}`).snapshotChanges().pipe(map(cpu => this.gen.getValue(cpu)));
  }
  getAllCPUs(queryFn?: QueryFn) {
    return this.afdb.list<CPU>('cpus', queryFn).snapshotChanges().pipe(map(cpus => this.gen.getValues(cpus)));
  }
}
