import { Injectable } from '@nestjs/common';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import * as winston from 'winston';
import * as os from 'os';
import {Syslog} from 'winston-syslog';

@Injectable()
export class AppService {
    
    private secretClient: SecretManagerServiceClient
    private _logger: winston.Logger
    
    constructor(){
        this.secretClient = new SecretManagerServiceClient();
        this.createLogger();
        
    }

    getHello(): string {
        return 'Hello World!';
    }

    async getSecret(secretName:string): Promise<any> {
        const [version] = await this.secretClient.accessSecretVersion({
            name: `projects/${process.env.GOOGLE_CLOUD_PROJECT}/secrets/${secretName}/versions/1`,
        });
        return version.payload.data.toString();
    }

    private async createLogger(){
        const logprovider = new Syslog({
            host: <string>(await this.getSecret('LOGGING_PROVIDER_HOST')),
            port: <number>(await this.getSecret('LOGGING_PROVIDER_PORT')),
            protocol: 'tls4',
            localhost: os.hostname(),
            eol: '\n'
        });

        this._logger = winston.createLogger({
            format: winston.format.simple(),
            levels: winston.config.syslog.levels,
            transports: [logprovider],
          });

        this._logger.info('starting logging...');
    }

    logger(){
        return this._logger;
    }

}
