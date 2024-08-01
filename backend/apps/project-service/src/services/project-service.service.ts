import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ProjectRepository } from '../repositories/project.repository';
import { Redis } from 'ioredis';
import { CreateProjectRequest } from '../dto/create-project.request';


@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    @Inject("REDIS_CLIENT") private readonly redis: Redis,
  ) {}

  async getProjects(userId: string) {
    return this.projectRepository.find({ userId });
  }

  async createProject(request: CreateProjectRequest) {
    const task: any = await this.projectRepository.create({...request, todos: []});
    await this.redis.set(task._id, JSON.stringify(task), "EX", 3600);
  }

  async updateProject(projectId: string, updateData: Partial<CreateProjectRequest>) {
    const project = await this.projectRepository.findById(projectId);

    if (project.userId !== updateData?.userId) {
      throw new UnauthorizedException('User not authorized to update this project');
    }

    await this.redis.del(projectId);
    return this.projectRepository.findByIdAndUpdate(projectId, updateData);
  }

  async getProject(projectId: string) {
    const cachedProject = await this.redis.get(projectId);
    if (cachedProject) {
      return JSON.parse(cachedProject);
    }
    const project = await this.projectRepository.findById(projectId);
    await this.redis.set(projectId, JSON.stringify(project), "EX", 3600);
    return project;
  }

}
