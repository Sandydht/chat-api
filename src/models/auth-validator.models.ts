export interface RegisterUserValidatorSchema {
  name: string;
  phone_number: string;
  password: string;
}

export interface LoginUserValidatorSchema {
  phone_number: string;
  password: string;
}