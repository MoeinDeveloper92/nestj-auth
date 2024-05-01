import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ArgonModule } from 'src/argon/argon.module';

@Module({
  //here you cna import other modules into your modules
  imports: [ArgonModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
