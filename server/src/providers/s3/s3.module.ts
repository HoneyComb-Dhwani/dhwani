import { Module, Global } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { env } from 'src/config';
import { S3Service } from './s3.service';

@Global()
@Module({
  providers: [
    {
      provide: 'S3_CLIENT',
      useFactory: (): S3Client => {
        return new S3Client({
          region: env.awsRegion || 'us-east-1',
          credentials: {
            accessKeyId: env.awsAccessKeyId || 'your-access-key-id',
            secretAccessKey: env.awsSecretAccessKey || 'your-secret-access-key',
          },
        });
      },
    },
    S3Service,
  ],
  exports: ['S3_CLIENT', S3Service],
})
export class S3Module {}
