import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'gateway01.ap-northeast-1.prod.aws.tidbcloud.com',
      port: 4000,
      username: '14f9gVFKUUeCkMd.root',
      password: 'MkoGnJrMTAgtLn0R',
      database: 'login',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // 주의: 개발 환경에서만 true (테이블 자동 생성)
      ssl: {
        rejectUnauthorized: true, // TiDB 보안 연결 필수
      },
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
