import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { AdministrationService } from './administration.service';
import { CreateAdministrationDto } from './dto/create-administration.dto';
import { UpdateAdministrationDto } from './dto/update-administration.dto';

@Controller('administrations')
export class AdministrationController {
  constructor(private readonly administrationService: AdministrationService) {}

  @Post()
  create(@Body() createAdministrationDto: CreateAdministrationDto) {
    return this.administrationService.create(createAdministrationDto);
  }

  @Get()
  findAll() {
    return this.administrationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.administrationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdministrationDto: UpdateAdministrationDto) {
    return this.administrationService.update(id, updateAdministrationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.administrationService.remove(id);
  }
}