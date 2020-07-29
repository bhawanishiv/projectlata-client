import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { GenService } from './gen.service';
import { Command } from '../models/command.model';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  constructor(
    private afdb: AngularFireDatabase,
    private gen: GenService) { }

  send(instanceId: string, pinNo: string, command: Command) {
    return this.afdb.list(`commands/${instanceId}/${pinNo}`).push(command);
  }
  get(instanceId: string, pinNo: string) {
    return this.afdb.list<Command>(`commands/${instanceId}/${pinNo}`).snapshotChanges().pipe(map(responses => this.gen.getValues(responses)));
  }
  getAll(instanceId: string) {
    return this.afdb.list(`commands/${instanceId}`).snapshotChanges().pipe(map(responses => this.gen.getValues(responses)));
  }

  clearAll(instanceId: string) {
    return this.afdb.object(`commands/${instanceId}`).remove();
  }
}
