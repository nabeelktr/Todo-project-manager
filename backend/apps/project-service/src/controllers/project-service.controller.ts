import { Body, Controller, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ProjectService } from '../services/project-service.service';
import { JwtAuthGuard } from '@app/common';
import { GetUserId } from '../decorator/user.decorator';
import { CreateProjectRequest } from '../dto/create-project.request';
import { Project } from '../schemas/project.schems';
import { Response } from 'express';

@Controller('projects')
export class ProjectServiceController {
  constructor(private readonly projectService: ProjectService) {}

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

  @Post('export')
  async exportProject(@Body() project: Project,  @Res() res: Response) {
    return this.projectService.exportProjectSummary(project, res);
  }
}
