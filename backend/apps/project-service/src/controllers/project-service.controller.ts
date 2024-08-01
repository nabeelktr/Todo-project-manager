import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProjectServiceService } from '../services/project-service.service';
import { JwtAuthGuard } from '@app/common';
import { GetUserId } from '../decorator/user.decorator';
import { CreateProjectRequest } from '../dto/create-project.request';

@Controller('projects')
export class ProjectServiceController {
  constructor(private readonly projectServiceService: ProjectServiceService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProjects(@GetUserId() userId: string) {
    return this.projectServiceService.getProjects(userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTask(@Body() request: CreateProjectRequest, @GetUserId() userId: string) {
    return this.projectServiceService.createProject({...request, userId});
  }
}
