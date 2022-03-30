import { ApiProperty } from "@nestjs/swagger";

export class GetFindMeUserDto {
    @ApiProperty({ example: 1 })
    public id: number;

    @ApiProperty({ example: "bunia@gmail.com" })
    public email: string;

    @ApiProperty({ example: "Joahn Kovalsky" })
    public name: string;

    @ApiProperty({ example: "+48 353 566 433" })
    public phoneNumber: string;

    @ApiProperty({ example: "https://picsum.photos/300/300" })
    public profileImageUrl: string;

    @ApiProperty({ example: "ul. Stańczyka" })
    public street: string;

    @ApiProperty({ example: "Kraków" })
    public city: string;

    @ApiProperty({ example: "Jestem sobie użytkownikiem aplikacji FindMe!" })
    public bio: string;

    @ApiProperty({ example: new Date() })
    public lastLogin: Date;

    @ApiProperty({ example: new Date() })
    public created: Date;
}
