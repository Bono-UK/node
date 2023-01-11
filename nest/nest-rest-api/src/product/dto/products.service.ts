import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
//import {isGeneratorFunction} from "util/types";
import {CreateProductDto} from "./create-product.dto";
import {Product, ProductDocument} from "./schemas/product.schema";
import { Model } from "mongoose";
import {Printer} from "prettier";
import {async} from "rxjs";
import {UpdateProductDto} from "./update-product.dto";

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productMododel: Model <ProductDocument>){
  }

    async getAll(): Promise<Product[]> {
      return this.productMododel.find().exec()
    }

      
    async getById(id: string): Promise<Product> {
      return this.productMododel.findById(id)
    }
    
    async create(productDto: CreateProductDto): Promise<Product> {
      const newProduct = new this.productMododel(productDto)
      return newProduct.save()
    }

    async remove(id: string): Promise<Product> {
      return this.productMododel.findByIdAndDelete(id)
    }

    async update(id:string, productDto: UpdateProductDto):Promise<Product> {
      return this.productMododel.findByIdAndUpdate(id,productDto,{new: true})
    }


}
