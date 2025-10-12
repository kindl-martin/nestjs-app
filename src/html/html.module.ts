import { Module } from '@nestjs/common';
import { HtmlController } from './html.controller';

@Module({
  controllers: [HtmlController],
})
export class HtmlModule {}
