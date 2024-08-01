import { Inject, Injectable } from '@nestjs/common';
import { ProjectRepository } from '../repositories/project.repository';
import { Redis } from 'ioredis';
import { CreateProjectRequest } from '../dto/create-project.request';


@Injectable()
export class ProjectServiceService {
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

}
