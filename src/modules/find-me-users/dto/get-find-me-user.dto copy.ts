import { ApiProperty } from "@nestjs/swagger";

export class GetFindMeUserDto {
    @ApiProperty({ example: "6219debb9434c4b7adfae813" })
    public _id: string;

    @ApiProperty({ example: "bunia@gmail.com" })
    public email: string;

    @ApiProperty({ example: "Joahn Kovalsky" })
    public name: string;

    @ApiProperty({ example: "353566433" })
    public phoneNumber: string;

    @ApiProperty({ example: true })
    public termsAccepted: boolean;

    @ApiProperty({ example: "https://picsum.photos/300/300" })
    public profileImageUrl: string;

    @ApiProperty({ example: new Date() })
    public lastLogin: Date;

    @ApiProperty({ example: new Date() })
    public created: Date;
}
