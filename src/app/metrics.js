import jm from "js-meter";

export default class Metric {
  constructor() {
    this.diffRAM = undefined;
    this.diffHeapTotal = undefined;
    this.diffHeapUsed = undefined;
    this.diffExternal = undefined;
    this.diffCPU = undefined;
    this.diffTime = undefined;
    this.tUnit = undefined;
    
    this.m = undefined;
  }

  start() {
    this.m = new jm({
      isKb: true, 
      isMs: true, 
      isPrint: false
    });
  }

  stop() {
    const {
      diffTime,
      diffCPU,
      diffExternal,
      diffHeapUsed,
      diffHeapTotal,
      diffRAM
    } = this.m.stop();

    this.diffCPU = diffCPU;
    this.diffTime = diffTime;
    this.diffExternal = diffExternal;
    this.diffHeapTotal = diffHeapTotal;
    this.diffHeapUsed = diffHeapUsed;
    this.diffRAM = diffRAM;
  }

  result() {
    const data = {
      diffTime: this.diffTime,
      diffCPU: this.diffCPU,
      diffExternal: this.convertToKBytes(this.diffExternal),
      diffHeapUsed: this.convertToKBytes(this.diffHeapUsed),
      diffHeapTotal: this.convertToKBytes(this.diffHeapTotal),
      diffRAM: this.convertToKBytes(this.diffRAM),
    };
    
    return data;
  }

  convertToKBytes(data) {
    const [value, unit] = data.split(' ');
    const numeric = Number.parseFloat(value);
    switch(unit) {
      case 'Bytes':
        return numeric/1024;
      case 'KB':
        return numeric;
      case 'MB':
        return numeric*1024;
      case 'GB':
        return numeric*Math.pow(1024,2);
      case 'TB':
        return numeric*Math.pow(1024,3);
    }
  }
}