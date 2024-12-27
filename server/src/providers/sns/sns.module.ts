import { Module, Global } from '@nestjs/common';
import { SNSClient } from '@aws-sdk/client-sns';
import { env } from 'src/config';

@Global()
@Module({
  providers: [
    {
      provide: 'SNS_CLIENT',
      useFactory: (): SNSClient => {
        return new SNSClient({
          region: env.awsRegion || 'us-east-1',
          credentials: {
            accessKeyId: env.awsAccessKeyId || 'your-access-key-id',
            secretAccessKey: env.awsSecretAccessKey || 'your-secret-access-key',
          },
        });
      },
    },
  ],
  exports: ['SNS_CLIENT'],
})
export class SnsModule {}
