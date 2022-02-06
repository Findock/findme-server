import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, MaxLength, MinLength } from 'class-validator';

export class CreateFindMeUserDto {
  @ApiProperty({
    required: true,
    example: 'user@mail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    minLength: 6,
    maxLength: 64,
    example: 'passw@1',
  })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(64)
  password: string;

  @ApiProperty({
    default: '',
    required: false,
    example: 'Joahn',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsAlpha()
  name?: string;

  @ApiProperty({
    default: '',
    required: false,
    example: 'Kovalsky',
  })
  @IsOptional()
  @IsAlpha()
  surname?: string;

  @ApiProperty({
    default: '',
    required: false,
    example: '353566433',
  })
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;
}
