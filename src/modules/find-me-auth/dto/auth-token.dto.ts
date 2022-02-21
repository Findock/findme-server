import { ApiProperty } from '@nestjs/swagger';

export class AuthTokenDto {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiJ9.NjIxMmJh' })
    access_token: string;

    @ApiProperty({ example: 'Bearer' })
    token_type: string;
}
