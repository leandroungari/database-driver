export default class Metric {
  constructor() {
    this.timeStart = undefined;
    this.timeEnd = undefined;
  }

  start() {
    this.timeStart = process.hrtime();
  }

  end() {
    this.timeEnd = process.hrtime(this.timeStart);
  }

  result() {
    return {
      time: this.timeEnd[1]/1000000
    }
  }
}