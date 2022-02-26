import { ApiProperty } from '@nestjs/swagger';

export default class UnauthorizedExceptionDto {
    @ApiProperty({ example: 400 })
    statusCode: number;

    @ApiProperty({ example: 'Unauthorized' })
    message: string;
}
