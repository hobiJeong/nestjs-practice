import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { CommonModule } from 'src/common/common.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.production.env'
          : process.env.NODE_ENV === 'stage'
            ? '.stage.env'
            : '.local.env',
    }),
  ],
  providers: [CoreService],
  exports: [CommonModule],
})
export class CoreModule {}
