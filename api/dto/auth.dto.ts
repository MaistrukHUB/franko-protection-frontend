export interface LoginFormDTO {
  email: string;
  password: string;
}
export interface RegisterFormDTO {
  name: string;
  phone: number;
  email: string;
  password: string;
}
export interface IUserDTO {
  id: number | null;
  name: string;
  phone: number | null;
  email: string;
}

export interface LoginResponseDTO {
  token: string;
  user: IUserDTO;
}
