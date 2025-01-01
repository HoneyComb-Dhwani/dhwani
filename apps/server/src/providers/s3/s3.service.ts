import { Injectable, Inject } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';

@Injectable()
export class S3Service {
  constructor(@Inject('S3_CLIENT') private readonly s3Client: S3Client) {}

  async uploadFile(
    bucketName: string,
    key: string,
    body: Buffer,
    contentType?: string,
  ): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: body,
      ContentType: contentType,
    });

    await this.s3Client.send(command);
  }

  async getFile(bucketName: string, key: string): Promise<Readable> {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const response = await this.s3Client.send(command);

    if (response.Body instanceof Readable) {
      return response.Body;
    }

    throw new Error('Failed to retrieve file from S3');
  }

  async deleteFile(bucketName: string, key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    await this.s3Client.send(command);
  }
}
