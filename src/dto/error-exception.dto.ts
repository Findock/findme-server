import { ApiProperty } from '@nestjs/swagger';

export default class ErrorExceptionDto {
    @ApiProperty({ example: 401 })
    statusCode: number;

    @ApiProperty({ example: [ 'User with this email does not exist.' ] })
    message: string[];

    @ApiProperty({ example: 'Unauthorized' })
    error: string;
}
