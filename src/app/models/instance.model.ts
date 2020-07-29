export interface Instance {
    instanceId?: string;
    activityId: string;
    comnDeviceId: string;
    cpuId: string;
    instanceName: string;
    ownerUid: string;
}


export interface Reading {
    time:Date;
    reading:string;
}

export interface PinReading {
    pinNo: string;
    values: Reading[];
  }