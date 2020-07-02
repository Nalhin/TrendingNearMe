import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './config/mongoose.config';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { envSchema } from './config/env.schema';

@Module({
  imports: [MongooseModule.forRootAsync({
    imports: [ConfigModule.forRoot({
      ignoreEnvFile: !!process.env.CI,
      envFilePath: join(__dirname, '..', '..', '.env'),
      validationSchema: envSchema,
    })],
    useExisting: MongooseConfigService,
  }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
