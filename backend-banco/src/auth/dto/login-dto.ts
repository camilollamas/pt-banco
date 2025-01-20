import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty(
    {
      default: 'admin',
      description: 'The username of the user'
    }
  )
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({
    default: 'admin',
    description: 'The password of the user'
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}