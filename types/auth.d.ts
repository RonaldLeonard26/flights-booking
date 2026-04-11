interface IRegister {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ILogin {
  email: string;
  password: string;
}

export type { IRegister, ILogin };
