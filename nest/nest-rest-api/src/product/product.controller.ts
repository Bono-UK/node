import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {ProductService} from './dto/products.service';
import {UpdateProductDto} from './dto/update-product.dto';
import { Product } from "./dto/schemas/product.schema";

@Controller('product')
export class ProductController {
  
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAll():Promise<Product[]> {
    return this.productService.getAll()
  }
  
  @Get(":id") 
  getOne(@Param("id") id: string):Promise<Product> {
    return this.productService.getById(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header("Cache-Control", "none")
  create(@Body() CreateProductDto: CreateProductDto):Promise<Product>  {
    return this.productService.create(CreateProductDto)
  }



@Delete(":id")
  remove(@Param("id") id:string):Promise<Product> {
    return this.productService.remove(id)
  }
  
  @Put(":id") 
  update(@Body() UpdateProductDto: UpdateProductDto,@Param("id")id :string):Promise<Product> {
    return this.productService.update(id, UpdateProductDto) 
  }
}




