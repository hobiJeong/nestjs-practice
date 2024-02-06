import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Redirect,
  Header,
  Query,
  DefaultValuePipe,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { UserLoginDto } from '../dto/user-login-dto';
import { VerifyEmailDto } from '../dto/verify-email-dto';
import { UserInfo } from '../interface/user-info.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    this.usersService.create(createUserDto);
  }

  @Post('email-verify')
  verifyEmail(@Query() verifyEmailDto: VerifyEmailDto): string {
    return this.usersService.verifyEmail(verifyEmailDto);
  }

  @Post('login')
  login(@Body() userLoginDto: UserLoginDto): void {
    return this.usersService.login(userLoginDto);
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
  findOne(@Param('id') userId: string): Promise<UserInfo> {
    return this.usersService.getUserInfo(userId);
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
