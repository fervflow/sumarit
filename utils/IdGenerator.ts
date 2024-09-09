"use client";

const idKey = 'latest_id';
export default class IdGenerator {
  private static instance: IdGenerator;
  private id: number;

  private constructor () {
      this.id = Number(localStorage.getItem(idKey)); //Number(null) -> 0
  }

  public static get Instance(): IdGenerator {
    return this.instance ?? new this();
  }

  public getId(): number {
    ++this.id;
    localStorage.setItem(idKey, this.id.toString())
    return this.id;
  }
  public resetId() {
    localStorage.setItem(idKey, '0')
    this.id = 0;
  }
}