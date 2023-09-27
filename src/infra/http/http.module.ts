import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TeacherController } from './modules/teacher/teacher.controller';
import { OrganizationController } from './modules/organization/organization.controller';
import { ModalityController } from './modules/modality/modality.controller';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    UserModule,
    TeacherController,
    OrganizationController,
    ModalityController,
    AuthModule,
  ],
})
export class HttpModule {}
