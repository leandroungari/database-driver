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
      isKb: false, 
      isMs: true, 
      isPrint: false
    });
  }

  end() {
    const {
      diffTime,
      diffCPU,
      diffExternal,
      diffHeapUsed,
      diffHeapTotal,
      diffRAM,
      tUnit
    } = this.m.stop();

    this.diffCPU = diffCPU;
    this.diffTime = diffTime;
    this.diffExternal = diffExternal;
    this.diffHeapTotal = diffHeapTotal;
    this.diffHeapUsed = diffHeapUsed;
    this.diffRAM = diffRAM;
    this.tUnit = tUnit;
  }

  result() {
    return {
      diffTime: this.diffTime,
      diffCPU: this.diffCPU,
      diffExternal: this.diffExternal,
      diffHeapUsed: this.diffHeapUsed,
      diffHeapTotal: this.diffHeapTotal,
      diffRAM: this.diffRAM,
      tUnit: this.tUnit
    }
  }
}