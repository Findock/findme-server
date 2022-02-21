import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        required: true,
        example: 'u0@email.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        required: true,
        example: 'password',
    })
    @IsNotEmpty()
    password: string;
}
