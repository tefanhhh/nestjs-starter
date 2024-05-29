import { Controller, Get, Query } from '@nestjs/common';
import { hash } from '../helpers';

@Controller('utils')
export class UtilsController {
  @Get('text-hasher')
  findAll(@Query('text') text: string): Promise<string> {
    return hash(text);
  }
}
