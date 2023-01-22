import { Controller, Get } from '@nestjs/common';


@Controller()
export class AppController {
    constructor() { }

    @Get()
    testenv() {
        return {titulo:"Bemvindo ao Financas API", hora: new Date()}
    }
}
