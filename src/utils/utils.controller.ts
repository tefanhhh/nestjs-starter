import { Controller, Get, Query } from '@nestjs/common';
import { hash } from '../helpers';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('utils')
@Controller('utils')
export class UtilsController {
  @Get('text-hasher')
  findAll(@Query('text') text: string): Promise<string> {
    return hash(text);
  }
}
