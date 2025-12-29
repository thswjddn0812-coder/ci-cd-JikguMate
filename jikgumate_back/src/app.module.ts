import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { ShippingInfoModule } from './shipping-info/shipping-info.module';
import { RefreshTokensModule } from './refresh-tokens/refresh-tokens.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'gateway01.ap-northeast-1.prod.aws.tidbcloud.com',
      port: 4000,
      username: '14f9gVFKUUeCkMd.root',
      password: 'MkoGnJrMTAgtLn0R',
      database: 'JikguMate',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // 주의: 개발 환경에서만 true (테이블 자동 생성)
      ssl: {
        rejectUnauthorized: true, // TiDB 보안 연결 필수
      },
    }),
    UsersModule,
    OrdersModule,
    ProductsModule,
    OrderItemsModule,
    ShippingInfoModule,
    RefreshTokensModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
