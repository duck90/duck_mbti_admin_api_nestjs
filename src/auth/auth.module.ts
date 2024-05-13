import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/admin/admin.module';
// import { TestService } from 'src/test/test.service';
import { AdminEntity } from 'src/admin/admin.entity';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '24h' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
