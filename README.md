## Installation
```
npm install @fsdp0/nestjs-client-s3 @aws-sdk/client-s3
```

## Usage
### Module
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
})
export class StorageModule {}
```

### Service
```ts
import { S3ClientService } from "@fsdp0/nestjs-client-s3"

@Injectable()
export class StorageService {
    constructor(s3ClientService: S3ClientService) {}

    method() {
        ...
    }
}
```

## License
This library is distributes under Apache License, Version 2.0, see LICENSE for more information.