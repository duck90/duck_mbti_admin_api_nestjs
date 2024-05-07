import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TestResultEntity } from './test-result.entity';
import { CreateResultDto } from './dto/create-test-result.dto';
import { AwsService } from 'src/aws/aws.service';

@Injectable()
export class TestResultService {
  constructor(
    @InjectRepository(TestResultEntity)
    private testResultRepository: Repository<TestResultEntity>,
    private readonly awsService: AwsService,
  ) {}

  async saveImage(file: Express.Multer.File) {
    return await this.imageUpload(file);
  }

  async imageUpload(file: Express.Multer.File) {
    const imageName = file.originalname.split('.').shift();
    const ext = file.originalname.split('.').pop();

    const imagefilename = await this.awsService.imageUploadToS3(
      `${Date.now()}_${imageName}.${ext}`,
      file,
      ext,
    );

    return { imagefilename };
  }

  async findAll(subject_id: number) {
    return this.testResultRepository.find({
      where: { subject_id },
    });
  }

  async saveOneResult(data: CreateResultDto) {
    const uploadResult = await this.awsService.imageBase64UploadToS3(
      `${Date.now()}_${data.subject_id}_${data.type}.png`,
      data.base64,
    );
    const fileName = uploadResult.url.replace(
      process.env.AWS_S3_BUCKET_URL,
      '',
    );
    const oldData = await this.testResultRepository.findOne({
      where: { subject_id: Number(data.subject_id), mbti: data.type },
    });

    if (!!oldData) {
      return await this.testResultRepository.save({
        ...oldData,
        filename: fileName,
        width: uploadResult.width,
        height: uploadResult.height,
      });
    } else {
      return await this.testResultRepository.save({
        subject_id: Number(data.subject_id),
        mbti: data.type,
        filename: fileName,
        width: uploadResult.width,
        height: uploadResult.height,
      });
    }
  }

  async saveManyResult(data: CreateResultDto[]) {
    const results = [];
    let result = null;

    try {
      for (const mbti of data) {
        const uploadResult = await this.awsService.imageBase64UploadToS3(
          `${Date.now()}_${mbti.subject_id}_${mbti.type}.png`,
          mbti.base64,
        );
        const fileName = uploadResult.url.replace(
          process.env.AWS_S3_BUCKET_URL,
          '',
        );

        const oldData = await this.testResultRepository.findOne({
          where: { subject_id: Number(mbti.subject_id), mbti: mbti.type },
        });

        if (!!oldData) {
          result = await this.testResultRepository.save({
            ...oldData,
            filename: fileName,
            width: uploadResult.width,
            height: uploadResult.height,
          });

          results.push(result);
        } else {
          result = await this.testResultRepository.save({
            subject_id: Number(mbti.subject_id),
            mbti: mbti.type,
            filename: fileName,
            width: uploadResult.width,
            height: uploadResult.height,
          });

          results.push(result);
        }
      }

      return results;
    } catch (e) {
      console.log(e);
    }
  }
}
