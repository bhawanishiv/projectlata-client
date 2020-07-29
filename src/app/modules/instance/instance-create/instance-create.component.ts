import { OnInit, Component, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CPU } from 'src/app/models/modules.model';
import { Activity } from 'src/app/models/activity.model';
import { InstanceService } from 'src/app/services/instance.service';
import { ModuleService } from 'src/app/services/module.service';
import { ActivityService } from 'src/app/services/activity.service';
import { Observable, Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { AppUser } from 'src/app/models/auth';

@Component({
    selector: `app-instance-create`,
    templateUrl: 'instance-create.component.html',
    styleUrls: ['instance-create.component.scss'],
})
export class InstanceCreateComponent implements OnInit, OnDestroy {

    @ViewChild('instanceForm') instanceForm;

    cpus$: Observable<CPU[]>;
    comnDevices$: Observable<CPU[]>;
    activieis$: Observable<Activity[]>;
    appUser: AppUser;
    userSubscripton: Subscription;
    instance: FormGroup;
    constructor(private fb: FormBuilder,
        public dialogRef: MatDialogRef<InstanceCreateComponent>,
        private moduleService: ModuleService,
        private auth: AuthService,
        private activityService: ActivityService,
        private instanceService: InstanceService) { }

    ngOnInit() {
        this.instance = this.fb.group({
            instanceName: ['', [Validators.required, Validators.pattern(/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/g)]],
            activityId: ['', [Validators.required]],
            cpuId: ['', [Validators.required]],
            comnDeviceId: ['', [Validators.required]],
        })
        this.userSubscripton = this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
        this.cpus$ = this.moduleService.getAllCPUs();
        this.activieis$ = this.activityService.getAll();
        this.comnDevices$ = this.moduleService.getAllCPUs();
    }
    ngOnDestroy() {
        this.userSubscripton.unsubscribe();
    }
    getError(control = 'instanceName') {
        const { message } = this.instance.get(control).errors;
        if (message) return message;
    }
    setError(error: any, control = 'instanceName') {
        this.instance.get(control).setErrors(error);
        this.instance.updateValueAndValidity()
    }

    crateInstance(form: any) {
        if (!this.instance.valid) return;
        return this.__saveInstanceToServer(form);
    }


    __saveInstanceToServer(instance: any) {
        this.instanceService.create({
            ownerUid: this.appUser.uid,
            instanceName: instance.instanceName,
            activityId: instance.activityId,
            cpuId: instance.cpuId,
            comnDeviceId: instance.comnDeviceId
        }).then(result => {
            this.dialogRef.close(result.key);
        }).catch(e => { this.setError(e) })
    }

}