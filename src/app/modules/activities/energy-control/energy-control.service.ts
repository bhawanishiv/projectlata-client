import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
}) export class EnergyControlService {

    sensivity = 0.185 | .100 | .066;
    offset = 2.5;
    defaultVoltage = 220;
    constructor() { }


    /**
     * @param value modified measured value ->(AvgAcs * (5.0 / 1024.0) from CPU
     * @param offset 2.5 for Arduino working on 5V
     * @param sensitivity 0.185 for ACS-05B-T, 0.100 for ACS-20A-T and 0.066 for ACS-30A-T
     * 
     * Current=(AcsOffset-(Arduino measured analog reading))/Sensitivity
     * 
     * ((AvgAcs * (5.0 / 1024.0)) is converitng the read voltage in 0-5 volts
     * 2.5 is offset(I assumed that arduino is working on 5v so the viout at no current comes
     * out to be 2.5 which is out offset. If your arduino is working on different voltage than 
     * you must change the offset according to the input voltage)
     * 0.185v(185mV) is rise in output voltage when 1A current flows at input
     */
    calcCurrentACS(modifiedAnalogReadValue: number, offset = 2.5, sensitivity = 0.185) {
        return ((offset - modifiedAnalogReadValue) / sensitivity);
    }

    calcPower(current: number, voltage = 220) {
        return current * voltage;
    }

}