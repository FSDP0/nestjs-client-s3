import { FactoryProvider, Provider } from "@nestjs/common";
import { S3ClientModuleAsyncOptions, S3ClientModuleOptions, S3ClientOptionFactory } from "../interfaces";
import { AWS_S3_CLIENT_OPTION_TOKEN } from "../constants";

/**
 * @function
 *
 * @param           {S3ClientModuleAsyncOptions}        options     - AWS S3 client configuration options
 */
export function createAsyncS3ClientOptionsProviders(options: S3ClientModuleAsyncOptions): Provider[] {
    const { useExisting, useFactory } = options;

    const providers: Provider[] = [createAsyncS3ClientOptionsProvider(options)];

    if (useExisting || useFactory) {
        return providers;
    }

    const { useClass } = options;

    if (useClass) {
        providers.push({
            provide: useClass,
            useClass
        });
    }

    return providers;
}

/**
 * @function
 *
 * @param           {S3ClientModuleAsyncOptions}        options     - AWS S3 client configuration options
 */
export function createAsyncS3ClientOptionsProvider(
    options: S3ClientModuleAsyncOptions
): FactoryProvider<S3ClientModuleOptions> {
    const { useFactory, inject = [] } = options;

    if (useFactory) {
        return {
            provide: AWS_S3_CLIENT_OPTION_TOKEN,
            useFactory,
            inject
        };
    }

    const { useExisting, useClass } = options;

    if (useExisting) {
        inject.push(useExisting);
    }

    if (useClass) {
        inject.push(useClass);
    }

    return {
        provide: AWS_S3_CLIENT_OPTION_TOKEN,
        useFactory: async (optionfactory: S3ClientOptionFactory) => await optionfactory.createS3ClientOption(),
        inject
    };
}
