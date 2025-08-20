import { DynamicModule, Module, Provider } from "@nestjs/common";

import type { S3ClientModuleAsyncOptions, S3ClientModuleOptions } from "./interfaces";

import { AWS_S3_CLIENT_OPTION_TOKEN } from "./constants";

import { createAsyncS3ClientOptionsProviders } from "./providers";

import { S3ClientService } from "./services";

@Module({
    providers: [S3ClientService],
    exports: [S3ClientService]
})
export class S3ClientModule {
    static register(options: S3ClientModuleOptions): DynamicModule {
        return {
            module: S3ClientModule,
            providers: [
                {
                    provide: AWS_S3_CLIENT_OPTION_TOKEN,
                    useValue: options
                }
            ]
        };
    }

    static registerAsync(options: S3ClientModuleAsyncOptions): DynamicModule {
        const { imports = [] } = options;

        const providers: Provider[] = createAsyncS3ClientOptionsProviders(options);

        return {
            module: S3ClientModule,
            imports,
            providers
        };
    }
}
