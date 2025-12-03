import { Controller, Get } from '@nestjs/common';

@Controller('html')
export class HtmlController {
  @Get()
  get() {
    return '<html lang="en"><body><div style="background: yellow;">AHOJ, MAXI</div></div></body></html>';
  }

  @Get('/json')
  getJson() {
    return {
      some: 'text',
    };
  }
}
