interface SignInDto {
  username: string;
  password: string;
}

interface SignUpDto {
  username: string;
  password: string;
  email: string;
  firstName?: string;
  lastName?: string;
  birthday?: string;
  passport?: string;
  gender?: string;
  bloodType?: string;
  country?: string;
  weight?: number;
  height?: number;
  tel?: string;
}

export { SignInDto, SignUpDto };
