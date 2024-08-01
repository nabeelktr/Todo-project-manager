import {
  IsString,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  IsDateString,
} from "class-validator";
import { TodoStatus } from "../enums/todo-status.enum";
import { TodoPriority } from "../enums/todo-priority.enum";

export class CreateTodoRequest {
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TodoStatus)
  @IsOptional()
  status: TodoStatus;

  @IsEnum(TodoPriority)
  @IsOptional()
  priority: TodoPriority;

  @IsDateString()
  @IsOptional()
  dueDate?: Date;
}
