import {Injectable} from "@nestjs/common"; 
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TaskEntity} from "./task.entity";

@Injectable()

export class AppServece {

  constructor(@InjectRepository(TaskEntity) private readonly taskRepository: Repository<TaskEntity>){}

  async getAll() {
    return this.taskRepository.find()
  }
  
  async getById(id:number) {
    return this.taskRepository.findOneBy({ id })
  }

  async doneTask(id:number) {
    const task = await this.getById(id)
    if (!task) null
    task.isContext = !task.isContext
    await this.taskRepository.save(task)
    return this.getAll()
  }

  async createTask(name:string) {
    const task = this.taskRepository.create({ name })
    
    await this.taskRepository.save(task)
    return this.getAll()
  }
  
  async editTask(id:number, name:string){
    const task = await this.getById(id)
    if(!task) null
    task.name = name
    await this.taskRepository.save(task)
    return this.getAll()
  }

  async deleteTask(id:number) {
    const task = await this.getById(id)
    if (!task) null
    await this.taskRepository.delete({ id })
    return this.getAll()
  }
}
