import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { ArgonModule } from './argon/argon.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    AuthModule,
    BookmarkModule,
    UserModule,
    PrismaModule,
    ArgonModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
