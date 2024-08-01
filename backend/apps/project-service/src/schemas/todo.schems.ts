import { AbstractDocument } from "@app/common/database/abstract.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { TodoStatus } from "../enums/todo-status.enum";
import { TodoPriority } from "../enums/todo-priority.enum";

@Schema({ versionKey: false, timestamps: true })
export class Todo extends AbstractDocument {

  @Prop({ required: true })
  projectId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description?: string;

  @Prop({type:String, enum: TodoStatus, default: TodoStatus.TODO })
  status: TodoStatus;

  @Prop({type:String, enum: TodoPriority, required: false })
  priority: TodoPriority;

  @Prop({ required: false })
  dueDate?: Date;

}

export const TodoSchema = SchemaFactory.createForClass(Todo)
