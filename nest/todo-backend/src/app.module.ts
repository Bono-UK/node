import { Module } from '@nestjs/common';
import { AppServece } from './app.service';
import {AppUpdate} from "./app.update"
import * as LocalSession from 'telegraf-session-local';
import { TelegrafModule } from 'nestjs-telegraf';
import { TypeOrmModule } from '@nestjs/typeorm';
import {join} from 'path';
import {TaskEntity} from './task.entity';

const sessions = new LocalSession({database:"session_db.json"})

@Module({
  imports: [
    TelegrafModule.forRoot({
      middlewares:[sessions.middleware()],
      token:"5741928993:AAFh5pRGr4n6wSWj-Ry8rrL0Rd1ODN9Cnnw"
    }),
    TypeOrmModule.forRoot({
      type:"postgres",
      host:"localhost",
      port: 5432,
      database:"telegraf",
      username:"dmosk",
      password:"background",
      entities: [join(__dirname,"**", "*.migrations.{ts,js}")],
      migrations:[join(__dirname,"**","*,entity.{ts,js}")],
      synchronize: true
    }),
    TypeOrmModule.forFeature([TaskEntity])
  ],
  providers: [AppServece, AppUpdate]
})

export class AppModule {}
