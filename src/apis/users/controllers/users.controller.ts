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
  Inject,
  LoggerService,
  Logger,
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
import {
  WINSTON_MODULE_NEST_PROVIDER,
  WINSTON_MODULE_PROVIDER,
} from 'nest-winston';
import { Logger as WinstonLogger } from 'winston';
import { CustomLogger } from 'src/middlewares/custom-logger.middleware';
import { ParsePositiveIntPipe } from 'src/common/validation-pipe/parse-positive-int.pipe';

config();

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: WinstonLogger,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly loggerService: LoggerService,
    @Inject(Logger)
    private readonly mainLogger: LoggerService,
    private readonly customLogger: CustomLogger,
  ) {}

  @Post()
  // @UseGuards(JwtAccessTokenGuard, HandlerRolesGuard)
  // @Roles(UserRole.Admin)
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    this.testLog(createUserDto);

    return this.usersService.create(createUserDto);
  }

  private testLog(dto: CreateUserDto) {
    this.customLogger.error('로거', JSON.stringify(dto));

    // this.logger.error('error: ', dto);
    // this.logger.warn('warn: ', dto);
    // this.logger.info('info: ', dto);
    // this.logger.http('http: ', dto);
    // this.logger.verbose('verbose: ', dto);
    // this.logger.debug('debug: ', dto);
    // this.logger.silly('silly: ', dto);

    // this.loggerService.warn('warn: ' + JSON.stringify(dto));
    // this.loggerService.log('log: ' + JSON.stringify(dto));
    // this.loggerService.verbose('verbose: ' + JSON.stringify(dto));
    // this.loggerService.debug('debug: ' + JSON.stringify(dto));

    // this.mainLogger.warn('warn: ' + JSON.stringify(dto));
    // this.mainLogger.log('log: ' + JSON.stringify(dto));
    // this.mainLogger.verbose('verbose: ' + JSON.stringify(dto));
    // this.mainLogger.debug('debug: ' + JSON.stringify(dto));
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
    @Param('id', ParsePositiveIntPipe) userId: number,
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
