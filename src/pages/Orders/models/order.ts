export default interface Order {
    id:number;
    product: string;
    customer: string;
    orderDate: string;
    orderTime: string;
    price:number;
    discount: string;
    confirmation: boolean;
  }