import { IsAlpha, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from "class-validator";

export class CreateFindMeUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsNotEmpty()
  @IsAlpha()
  name?: string;

  @IsOptional()
  @IsAlpha()
  surname?: string;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @IsOptional()
  profileImageUrl?: string;
}
