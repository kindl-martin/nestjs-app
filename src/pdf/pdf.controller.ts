import { Controller, Get, Res, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'node:fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('pdf')
export class PdfController {
  @Get()
  getPdf(@Res({ passthrough: true }) res: Response) {
    const filePath = join(process.cwd(), 'sample.pdf');
    const file = createReadStream(filePath);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="sample.pdf"`,
    });

    return new StreamableFile(file);
  }
}
