import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('html')
export class HtmlController {
  @Get()
  get() {
    return '<html lang="en"><body><div style="background: yellow;">AHOJ, MAXI</div></div></body></html>';
  }

  @Get('/json/:id')
  getJson(@Param('id') id: string, @Query('name') name?: string) {
    return {
      id,
      some: 'text',
      name,
    };
  }
}
