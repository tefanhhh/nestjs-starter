import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UtilsController } from './utils/utils.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      useUnifiedTopology: true,
      entities: [User],
      synchronize: true,
      verboseRetryLog: true,
      // dropSchema: true,
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [UtilsController],
  providers: [],
})
export class AppModule {}
