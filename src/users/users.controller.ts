import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Redirect,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { reportableClassDecorator } from './decorators/test.decorator';

@reportableClassDecorator
@Controller({ host: 'localhost' })
export class UsersController {
  type = 'report';
  title: string;
  constructor(
    private readonly usersService: UsersService,
    // t: string,
    // private readonly t: string,
  ) {
    // this.t = t;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('users')
  async findAll(@Req() req: Request) {
    console.log(req.hostname);
    const Controller = new UsersController(this.usersService);
    Controller.title = 'abc';
    console.log(Controller);
    return 'abc';
  }

  @Get(':id')
  @Redirect('https://docs.nestjs.com', 302)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
