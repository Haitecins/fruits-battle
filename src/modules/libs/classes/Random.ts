class Random {
  protected min: number;
  protected max: number;
  protected toFixed: number;
  public constructor(min?: number, max?: number, toFixed?: number) {
    this.min = min || 0;
    this.max = max || 0;
    this.toFixed = toFixed || 0;
  }
  public getItem<T>(items: T[]): T {
    const index = new Random(0, items.length - 1).getNumber();
    return items[index];
  }
  public getNumber(): number {
    if (this.toFixed) {
      return parseFloat(
        (Math.random() * (this.max - this.min) + this.min).toFixed(this.toFixed)
      );
    } else {
      return Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
    }
  }
}

export default Random;
