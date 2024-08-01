import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProjectServiceService } from '../services/project-service.service';
import { JwtAuthGuard } from '@app/common';
import { GetUserId } from '../decorator/user.decorator';
import { CreateProjectRequest } from '../dto/create-project.request';

@Controller('projects')
export class ProjectServiceController {
  constructor(private readonly projectService: ProjectServiceService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProjects(@GetUserId() userId: string) {
    return this.projectService.getProjects(userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProject(@Body() request: CreateProjectRequest, @GetUserId() userId: string) {
    return this.projectService.createProject({...request, userId});
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateProject(@Body() request: CreateProjectRequest, @Param("id") projectId: string, @GetUserId() userId: string) {
    return this.projectService.updateProject(projectId, {...request, userId});
  }

  @Get('view/:id')
  @UseGuards(JwtAuthGuard)
  async getProject(@Param("id") projectId: string) {
    return this.projectService.getProject(projectId);
  }
}
