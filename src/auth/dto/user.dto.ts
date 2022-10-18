import { ROLE } from '@prisma/client';
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
  gender?: ROLE;
  bloodType?: string;
  country?: string;
  weight?: number;
  height?: number;
  phoneNumber?: string;
  role_id: number;
}

export { SignInDto, SignUpDto };
