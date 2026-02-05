import { Module } from '@nestjs/common';
import { PdfController } from '@app/pdf/pdf.controller';

@Module({
  controllers: [PdfController],
})
export class PdfModule {}
