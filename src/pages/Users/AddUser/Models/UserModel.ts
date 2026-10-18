export interface UserValues {
  customer: string;
  userName: string;
  password: string;
  phoneNumber: string;
  email: string;
}

export default interface User extends UserValues {
  id: number;
}
