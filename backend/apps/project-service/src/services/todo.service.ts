import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Redis } from 'ioredis';
import { TodoRepository } from '../repositories/todo.repository';
import { CreateTodoRequest } from '../dto/create-todo.request';
import { ProjectRepository } from '../repositories/project.repository';
import { Types } from 'mongoose';


@Injectable()
export class TodoService {
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly projectRepository: ProjectRepository,
    @Inject("REDIS_CLIENT") private readonly redis: Redis,
  ) {}

  async getTodos(projectId: string) {
    return this.todoRepository.find({ projectId });
  }

  async createTodo(request: CreateTodoRequest) {
    const project = await this.projectRepository.findById(request.projectId);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    const todo: any = await this.todoRepository.create(request);
    await this.projectRepository.findOneAndUpdate(
        { _id: new Types.ObjectId(request.projectId) },
        { $push: { todos: todo._id } }
    );

    await this.redis.set(todo._id.toString(), JSON.stringify(todo), "EX", 3600);
    await this.redis.set(project._id.toString(), JSON.stringify(project), "EX", 3600);
    return todo;
  }

  async updateTodo(todoId: string, updateData: Partial<CreateTodoRequest>) {
    await this.redis.del(todoId);
    return this.todoRepository.findByIdAndUpdate(todoId, updateData);
  }

  async deleteTodo(todoId: string) {
    await this.redis.del(todoId);
    const todo:any = await this.todoRepository.findById(todoId);
    if (!todo) {
        throw new NotFoundException('Todo not found');
    }
    const project = await this.projectRepository.findById(todo.projectId)
    if (!project) {
        throw new NotFoundException('Project not found');
    }
    project.todos = project.todos.filter((id) => id.toString() !== todoId);
    await this.projectRepository.findByIdAndUpdate(
        todo.projectId ,
        {...project}
    );
    await this.todoRepository.deleteById(todoId);
    await this.redis.set(project._id.toString(), JSON.stringify(project), "EX", 3600);
    return { message: 'Todo successfully deleted' };
  }

}
