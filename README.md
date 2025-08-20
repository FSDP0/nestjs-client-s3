## Description
AWS S3 module for NestJS based on the official [@aws-sdk/client-s3](https://www.npmjs.com/package/@aws-sdk/client-s3) package.

## Installation
```
npm install --save @fsdp0/nestjs-client-s3 @aws-sdk/client-s3
```

## Usage
 * Module
```ts
import { Module } from '@nestjs/common';
import { S3ClientModule } from "@fsdp0/nestjs-client-s3"

@Module({
  imports: [
    S3ClientModule.register({
      region: '{{REGION}}',
      endpoint: 'https://{{HOSTNAME}}:{{PORT}',
    }),
  ],
  providers: [...]
})
export class StorageModule {}
```

 * Service
```ts
import { S3ClientService } from "@fsdp0/nestjs-client-s3"

@Injectable()
export class StorageService {
    constructor(private readonly s3ClientService: S3ClientService) {}
}
```

## Async Options
 * useFactory
```ts
import { S3ClientModule } from "@fsdp0/nestjs-client-s3"

@Module({
  imports: [
    S3ClientModule.registerAsync({
        useFactory: () => ({
            region: '{{REGION}}',
            endpoint: 'https://{{HOSTNAME}}:{{PORT}',
        })
    })
  ],
  providers: [...]
})
export class StorageModule {}
```
Factory behaves like every other one, inject dependencies through `inject`
```ts
import { S3ClientModule } from "@fsdp0/nestjs-client-s3"
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    S3ClientModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
            region: configService.get("AWS_S3_REGION"),
            endpoint: configService.get("AWS_S3_ENDPOINT"),
        }),
        inject: [ConfigService]
    })
  ],
  providers: [...]
})
export class StorageModule {}
```

 * useClass
```ts
import { S3ClientModule } from "@fsdp0/nestjs-client-s3"
import { S3ClientConfigService } from "...";

@Module({
  imports: [
    S3ClientModule.registerAsync({
        useClass: S3ClientConfigService
    })
  ],
  providers: [...]
})
export class StorageModule {}
```
```ts
import { S3ClientOptionFactory } from "@fsdp0/nestjs-client-s3"

@Injectable()
export class S3ClientConfigService implements S3ClientOptionFactory {
    createS3ClientOption(): S3ClientModuleOptions {
        return {
            region: configService.get("AWS_S3_REGION"),
            endpoint: configService.get("AWS_S3_ENDPOINT"),
        }
    }
}
```
 * useExisting
```ts
import { S3ClientModule } from "@fsdp0/nestjs-client-s3"
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    S3ClientModule.registerAsync({
        imports: [ConfigModule],
        useExisting: ConfigService
    })
  ],
  providers: [...]
})
export class StorageModule {}
```

## License
This library is distributes under [Apache-2.0 license](http://www.apache.org/licenses/LICENSE-2.0), see LICENSE for more information.

## Author
 * Ray Lee - https://github.com/FSDP0