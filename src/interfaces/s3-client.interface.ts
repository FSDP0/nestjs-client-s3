import type { S3ClientConfig } from "@aws-sdk/client-s3";
import type { ModuleMetadata, Type } from "@nestjs/common";

/**
 * @public
 *
 * @type        {S3ClientConfig}
 *
 * @see         {@link S3ClientConfig}
 */
export type S3ClientModuleOptions = S3ClientConfig;

/**
 * @interface
 *
 * @method          createS3ClientOption(): Promise<S3ClientModuleOptions> | S3ClientModuleOptions
 */
export interface S3ClientOptionFactory {
    createS3ClientOption(): Promise<S3ClientModuleOptions> | S3ClientModuleOptions;
}

/**
 * @public
 *
 * @interface
 *
 * @property        [useExisting]
 * @property        [useClass]
 * @property        [useFactory]
 * @property        [inject]
 */
export interface S3ClientModuleAsyncOptions extends Pick<ModuleMetadata, "imports"> {
    /**
     * @property    useExisting
     *
     * @implements  {S3ClientOptionFactory}
     */
    useExisting?: Type<S3ClientOptionFactory>;

    /**
     * @property    useClass
     *
     * @implements  {S3ClientOptionFactory}
     */
    useClass?: Type<S3ClientOptionFactory>;

    /**
     * @property    useFactory
     *
     * @param       {...*}     args    -   Factory dependencies
     *
     * @example
     * ```ts
     * S3ClientModule.register({
     *      useFactory: (configService: ConfigService) => {...}
     * })
     * ```
     */
    useFactory?: (...args: any[]) => Promise<S3ClientModuleOptions> | S3ClientModuleOptions;

    /**
     * @property    inject
     *
     * @type        {any[]}
     */
    inject?: any[];
}
