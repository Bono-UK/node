import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ProductsModule} from './product/dto/products.module';

const uri = "mongodb+srv://bono:background@cluster0.4qqwy3h.mongodb.net"

@Module({
  imports: [ProductsModule,MongooseModule.forRoot(uri)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
