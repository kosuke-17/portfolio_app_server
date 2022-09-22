import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

// loggerのためにPrismaClientにあるthis.$onの型推論を拡張
@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  constructor() {
    super({ log: ['query', 'info', 'warn', 'error'] });
  }
  async onModuleInit() {
    this.$on('query', (event) => {
      this.logger.log(
        `Query: ${event.query}`,
        `Params: ${event.params}`,
        `Duration: ${event.duration} ms`,
      );
    });
    this.$on('info', (event) =>
      this.logger.log(`メッセージ: ${event.message}`),
    );
    this.$on('error', (event) => this.logger.log(`エラー: ${event.message}`));
    this.$on('warn', (event) => this.logger.log(`警告: ${event.message}`));

    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
