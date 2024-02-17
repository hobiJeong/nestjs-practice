import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { config } from 'dotenv';
import { UserDto } from '../dto/user.dto';
import { JwtAccessTokenGuard } from 'src/apis/auth/jwt/guards/jwt-access-token.guard';
import { User } from 'src/common/decorators/user.decorator';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../constants/user-role.enum';
import { HandlerRolesGuard } from 'src/apis/auth/jwt/guards/handler-roles.guard';

config();

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(HandlerRolesGuard)
  @Roles(UserRole.Admin)
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.usersService.create(createUserDto);
  }

  @Header('NestJS-Book-Study', 'study')
  @Get()
  async findAll(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    console.log(offset, limit);
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAccessTokenGuard)
  findOne(
    @User('id') id: number,
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<UserDto> {
    return this.usersService.findOneUserBy(id, userId);
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
