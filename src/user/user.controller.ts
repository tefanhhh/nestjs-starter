import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  UseGuards,
  ParseBoolPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { User } from './entities/user.entity';
import { PaginationMeta } from 'src/models/pagination-meta.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({
    type: CreateUserDto,
  })
  @Post()
  async create(@Body() body: CreateUserDto) {
    return this.userService.create({
      ...body,
    });
  }

  @ApiQuery({
    name: 'page',
    required: false,
  })
  @ApiQuery({
    name: 'perPage',
    required: false,
  })
  @ApiQuery({
    name: 'withPassword',
    required: false,
  })
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('perPage', new DefaultValuePipe(10), ParseIntPipe) perPage = 10,
    @Query('withPassword', new DefaultValuePipe(false), ParseBoolPipe)
    withPassword = false,
  ): Promise<Pagination<User>> {
    return this.userService.findAll(
      {
        page,
        limit: perPage,
        metaTransformer: (meta: IPaginationMeta): any =>
          new PaginationMeta(
            meta.totalItems,
            page < meta.totalPages,
            page > 1,
            page,
            perPage,
          ),
      },
      {
        withPassword,
      },
    );
  }

  @ApiParam({
    name: 'id',
  })
  @ApiQuery({
    name: 'withPassword',
    required: false,
  })
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('withPassword', new DefaultValuePipe(10), ParseBoolPipe)
    withPassword = false,
  ) {
    return this.userService.findOne(+id, {
      withPassword,
    });
  }

  @ApiParam({
    name: 'id',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, {
      ...updateUserDto,
    });
  }

  @ApiParam({
    name: 'id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
