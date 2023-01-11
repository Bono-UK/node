import { InjectBot, Start, Update, Hears, On, Message, Ctx} from "nestjs-telegraf"
import { Telegraf } from "telegraf"
import {actionButtons} from "./app.buttons"
import { AppServece } from "./app.service"
import { Context } from "./app.interface"
import {listShow} from "./app.utils"


@Update()
export class AppUpdate {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>,private readonly appServece: AppServece) {}
  
  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply("Hi") 
    await ctx.reply("что ты хочешь зделать", actionButtons())
  }

  @Hears("create todo")
  async createTask(ctx: Context) { 
    ctx.session.type = "create" 
    ctx.reply("напиши задачу")
  } 

  @Hears("todo list")
  async getAll(ctx: Context) {
    const todos = await this.appServece.getAll()
    ctx.reply(listShow(todos))
  } 

 @Hears("edit todo")
  async editTask(ctx: Context) {
    await ctx.replyWithHTML("напишите id и новое задание :\n "+ "в формате -1 |<b>новое задание </b>")
    ctx.session.type = "edit"
  } 

 @Hears("delete todo")
  async deleteTask(ctx: Context) {
    ctx.reply("нопиши id задачи")
    ctx.session.type = "remove"
  } 

@Hears("done todo")
  async doneTask(ctx: Context) {
    await ctx.reply("напишите ID задачи")
    ctx.session.type = "done"
  } 

@On("text")   
  async getMassage(@Message("text") message: string, @Ctx() ctx: Context){
    if (!ctx.session.type) return
      //create
    if (ctx.session.type === "create") {
      const todos = await this.appServece.createTask(message)
    }
 
      //done
    if (ctx.session.type === "done") {
      const todos = await this.appServece.doneTask(Number(message))
      if(!todos) {
        await ctx.reply("задача с таким id не найдена")
        return 
      }
    }
      //edit 
    if (ctx.session.type === "edit") {
      const [taskId, taskName] = message.split(" | ")
      const todos = await this.appServece.editTask(Number(taskId), taskName)

      if (!todos) {
        await ctx.deleteMessage()
        await ctx.reply("задача с таким id не найдена")
        return
      }
    }  
    if (ctx.session.type === "remove") {
      const todos = await this.appServece.deleteTask(Number(message))

      if (!todos) {
        await ctx.deleteMessage()
        await ctx.reply("задача с таким id не найдена")
        return
      }

      await ctx.reply(listShow(todos))
    }  
  }
}










 










/*
  @On("text")   
  async getMassage(@Message("text") message: string, @Ctx() ctx: Context){


     if (!ctx.session.type) return
    //done
    if (ctx.session.type === "done") {
      const todos = await this.appServece.doneTask(Number(messege))
      if (!todo) {
        await ctx.reply("задача с таким id не найдена")

        return
      }
      todo.isCompleted = !todo.isCompleted
      await ctx.reply(listShow(todos))
    }
    //edit
    if (ctx.session.type === "edit") {
      const [taskId, taskName] = message.split(" | ")
      const todos = await this.appServece.editTask(Number(taskId), taskName)


      if (!todos) {
              }
      await ctx.reply(listShow(todos))
    }
    //remove
    if (ctx.session.type === "remove") {
      const todo = todos.find(t => t.id === Number(message))
      if (!todo) {
        await ctx.deleteMessage()
        await ctx.reply("задачи с каким id не найдена")
        return
      }
      await ctx.reply(listShow(todos.filter(t => t.id !== Number(message))))
    }

  }
  */
