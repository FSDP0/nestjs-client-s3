import { Inject, Injectable, Optional } from "@nestjs/common";
import { S3Client } from "@aws-sdk/client-s3";

import type { S3ClientModuleOptions } from "src/interfaces";
import { AWS_S3_CLIENT_OPTION_TOKEN } from "../constants";

@Injectable()
export class S3ClientService extends S3Client {
    constructor(@Optional() @Inject(AWS_S3_CLIENT_OPTION_TOKEN) options: S3ClientModuleOptions) {
        super(options);
    }
}
