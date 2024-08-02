import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ProjectRepository } from "../repositories/project.repository";
import { Redis } from "ioredis";
import { CreateProjectRequest } from "../dto/create-project.request";
import { TodoRepository } from "../repositories/todo.repository";
import * as fs from "fs";
import { Project } from "../schemas/project.schems";
import { join } from "path";
import { Response } from "express";

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly todoRepository: TodoRepository,
    @Inject("REDIS_CLIENT") private readonly redis: Redis
  ) {}

  async getProjects(userId: string) {
    const resp = await this.projectRepository.find({ userId });
    return resp;
  }

  async createProject(request: CreateProjectRequest) {
    const task: any = await this.projectRepository.create({
      ...request,
      todos: [],
    });
    await this.redis.set(task._id, JSON.stringify(task), "EX", 3600);
  }

  async updateProject(
    projectId: string,
    updateData: Partial<CreateProjectRequest>
  ) {
    const project = await this.projectRepository.findById(projectId);

    if (project.userId !== updateData?.userId) {
      throw new UnauthorizedException(
        "User not authorized to update this project"
      );
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

  async generateMarkdown(project: Project) {
    const completedTodos = await this.todoRepository.find({
      projectId: project._id,
      status: "Finished",
    });
    const pendingTodos = await this.todoRepository.find({
      projectId: project._id,
      status: { $ne: "Finished" },
    });
    const summary = `${completedTodos.length} / ${
      completedTodos.length + pendingTodos.length
    } completed`;
    const pendingTasks = pendingTodos
      .map((todo) => `- [ ] ${todo.title}`)
      .join("\n");
    const completedTasks = completedTodos
      .map((todo) => `- [x] ${todo.title}`)
      .join("\n");
    return `# ${project.title}\n\n## Summary\n\n${summary}\n\n## Pending Todos\n\n${pendingTasks}\n\n## Completed Todos\n\n${completedTasks}`;
  }

  async exportProjectSummary(project: Project, res: Response) {
    const markdownContent = await this.generateMarkdown(project);
    const fileName = `${project.title}.md`;
    const filePath = join(__dirname, "../../../", fileName);
    fs.writeFileSync(filePath, markdownContent);
    res.download(filePath, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
        return;
      }
      fs.unlinkSync(filePath);
    });
    return { message: "export successful" };
  }
}
