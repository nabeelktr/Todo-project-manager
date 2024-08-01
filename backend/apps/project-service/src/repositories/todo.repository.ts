import { AbstractRepository } from "@app/common/database/abstract.repository";
import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Todo } from "../schemas/todo.schems";

@Injectable()
export class TodoRepository extends AbstractRepository<Todo>{
    protected readonly logger = new Logger(TodoRepository.name)

    constructor(@InjectModel(Todo.name) todoModal: Model<Todo>, @InjectConnection() connection: Connection){
        super(todoModal, connection)
    }
}