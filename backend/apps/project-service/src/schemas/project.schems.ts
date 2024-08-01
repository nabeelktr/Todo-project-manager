import { AbstractDocument } from "@app/common/database/abstract.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ versionKey: false, timestamps: true })
export class Project extends AbstractDocument {

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Todo' }] })
  todos: Types.ObjectId[];

}

export const ProjectSchema = SchemaFactory.createForClass(Project);
