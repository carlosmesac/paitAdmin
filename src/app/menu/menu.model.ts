export class Menu {
  public menuName:string;
  public first:string;
  public firstImageURL:string;
  public second:string;
  public secondImageURL:string;
  public dessert:string;
  public dessertImageURL:string;
  public price: number;
  public uid: string;
  constructor(name:string,first:string,firstImageURL:string,second:string,secondImageURL:string,dessert:string,dessertImageURL:string,price:number, uid:string) {
    this.first = first;
    this.firstImageURL = firstImageURL;
    this.second = second;
    this.secondImageURL = secondImageURL;
    this.dessert = dessert;
    this.dessertImageURL = dessertImageURL;
    this.price = price;
    this.uid = uid;
  }
}
