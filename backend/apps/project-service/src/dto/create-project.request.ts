import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from 'mongoose';

export class CreateProjectRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsArray()
  @IsOptional() 
  todos: Types.ObjectId[] = [];
}
