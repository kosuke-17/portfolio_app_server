import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
