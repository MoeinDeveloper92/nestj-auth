import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
