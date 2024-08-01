import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@app/common';
import { TodoService } from '../services/todo.service';
import { CreateTodoRequest } from '../dto/create-todo.request';

@Controller('projects/todos')
export class TodoServiceController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getTodos(@Param("id") projectId: string) {
    return this.todoService.getTodos(projectId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTodo(@Body() request: CreateTodoRequest) {
    return this.todoService.createTodo(request);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateTodo(@Body() request: CreateTodoRequest, @Param("id") todoId: string) {
    return this.todoService.updateTodo(todoId, request);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteTodo(@Param("id") todoId: string){
    return this.todoService.deleteTodo(todoId);
  }

}
