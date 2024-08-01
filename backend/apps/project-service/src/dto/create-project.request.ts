import { IsNotEmpty, IsString } from "class-validator";

export class CreateProjectRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
