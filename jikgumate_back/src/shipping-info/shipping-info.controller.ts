import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShippingInfoService } from './shipping-info.service';
import { CreateShippingInfoDto } from './dto/create-shipping-info.dto';
import { UpdateShippingInfoDto } from './dto/update-shipping-info.dto';

@Controller('shipping-info')
export class ShippingInfoController {
  constructor(private readonly shippingInfoService: ShippingInfoService) {}

  @Post()
  create(@Body() createShippingInfoDto: CreateShippingInfoDto) {
    return this.shippingInfoService.create(createShippingInfoDto);
  }

  @Get()
  findAll() {
    return this.shippingInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shippingInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShippingInfoDto: UpdateShippingInfoDto) {
    return this.shippingInfoService.update(+id, updateShippingInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shippingInfoService.remove(+id);
  }
}
