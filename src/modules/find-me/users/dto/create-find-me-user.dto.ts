import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';

export class CreateFindMeUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    default: '',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsAlpha()
  name?: string;

  @ApiProperty({
    default: '',
    required: false,
  })
  @IsOptional()
  @IsAlpha()
  surname?: string;

  @ApiProperty({
    default: '',
    required: false,
  })
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;
}
