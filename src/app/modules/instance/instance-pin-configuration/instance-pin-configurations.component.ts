import { Component, OnInit, Input } from '@angular/core';
import { Instance } from 'src/app/models/instance.model';
import { PinConfigurationService } from 'src/app/services/pin-configuration.service';
import { MatDialog } from '@angular/material/dialog';
import { NgpConfirmDialog } from '../../sharing/confirm-dialog';
import { CommandService } from 'src/app/services/command.service';
import { ReadingService } from 'src/app/services/reading.service';

@Component({
  selector: 'instance-pin-configurations',
  templateUrl: './instance-pin-configurations.component.html',
  styleUrls: ['./instance-pin-configurations.component.scss']
})
export class InstancePinConfigurationsComponent implements OnInit {
  @Input('configurations') configs;
  @Input('instance') instance: Instance;

  constructor(private pinService: PinConfigurationService,
    private cmdService: CommandService,
    private readingService:ReadingService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }
  removeAll() {
    const dialogRef = this.dialog.open(NgpConfirmDialog, {
      data: 'This will delete all commands and readings too. Are your sure you want to delete all pin definitions?'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (typeof result !== 'boolean') return;
      if (!result) return;
      this.pinService.removeAll(this.instance.instanceId);
      this.cmdService.clearAll(this.instance.instanceId);
      this.readingService.removeAll(this.instance.instanceId);
    });
  }

  remove(pinNo: string) {
    this.pinService.remove(this.instance.instanceId, pinNo);
  }
}
