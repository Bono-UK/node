import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity({ name:"Task" })
export class TaskEntity {
  @PrimaryColumn()
  id: number

  @Column({ type:"text" })
  name: string

  @Column({ default: false })
  isContext: boolean
}
