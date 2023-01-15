import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequestWithUser } from 'src/auth/jwt.strategy';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('liked')
  likedProduct(@Req() req: RequestWithUser) {
    console.log(
      '🚀 ~ file: product.controller.ts:45 ~ ProductController ~ likedProduct ~ eq.user.userId',
      req.user,
    );
    return this.productService.likedProducts(+req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  likeProduct(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.productService.likeProduct(+id, +req.user.userId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(+id, updateProductDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
