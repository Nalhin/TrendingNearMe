import { Module, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './config/mongoose.config';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { envSchema } from './config/env.schema';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RequireAuthGuard } from './common/guards/require-auth.guard';
import { StripPropertiesSerializerInterceptor } from './common/interceptors/strip-properties-serializer.interceptor';
import { TwitterModule } from './twitter/twitter.module';
import { TrendsModule } from './trends/trends.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !!process.env.CI,
      envFilePath: join(__dirname, '..', '..', '..', '..', '.env'),
      validationSchema: envSchema,
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    AuthModule,
    UsersModule,
    TwitterModule,
    TrendsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RequireAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: StripPropertiesSerializerInterceptor,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
