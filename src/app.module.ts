import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { ArgonModule } from './argon/argon.module';

@Module({
  imports: [AuthModule, BookmarkModule, UserModule, PrismaModule, ArgonModule],
})
export class AppModule {}
