import {Module} from "@nestjs/common";
import {ProductController} from "../product.controller";
import {ProductService} from "./products.service";
import { MongooseModule } from "@nestjs/mongoose";
import {ProductSchema} from "./schemas/product.schema";
import { Product } from "./schemas/product.schema"

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  imports: [
    MongooseModule.forFeature([
     {name: Product.name, schema: ProductSchema}
    ])
  ]
})
export class ProductsModule {
  
}
