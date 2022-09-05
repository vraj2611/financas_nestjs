import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import * as os from 'os';
import { Syslog } from 'winston-syslog';

@Injectable()
export class LoggingService {
    private _logger: winston.Logger

    constructor(    ) {
        const logprovider = new Syslog({
            host: process.env.LOGGING_PROVIDER_HOST,
            port: parseInt(process.env.LOGGING_PROVIDER_PORT),
            protocol: 'tls4',
            localhost: os.hostname(),
            eol: '\n'
        });

        this._logger = winston.createLogger({
            format: winston.format.simple(),
            levels: winston.config.syslog.levels,
            transports: [logprovider],
        });

        this._logger.info('starting logging...z');

    }

    info(message:string) {
        this._logger.info(message);
    }

    error(message:string){
        this._logger.error(message);
    }

    warn(message:String){
        this._logger.warn(message);
    }

}
