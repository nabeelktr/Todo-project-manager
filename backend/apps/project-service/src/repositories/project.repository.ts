import { AbstractRepository } from "@app/common/database/abstract.repository";
import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Project } from "../schemas/project.schems";

@Injectable()
export class ProjectRepository extends AbstractRepository<Project>{
    protected readonly logger = new Logger(ProjectRepository.name)

    constructor(@InjectModel(Project.name) projectModal: Model<Project>, @InjectConnection() connection: Connection){
        super(projectModal, connection)
    }
}