import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';

@Module({
  controllers: [OrganizationController],
  providers: [],
})
export class OrganizationModule {}
