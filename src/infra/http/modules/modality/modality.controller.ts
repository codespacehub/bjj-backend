import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateModalityDto } from './dto/CreateModalityDto';
import { CreateModalityService } from './services/create-modality.service';
import { ApiSecurity } from '@nestjs/swagger';
import { JwtAuthzGuard } from '../auth/guards/auth-guard';
import { User } from '@/shared/decorators/user.decorator';
import { TLoggedUser } from '@/shared/interface/user/logged-user.interface';

@Controller('modality')
export class ModalityController {
  constructor(private readonly createModalityService: CreateModalityService) {}

  @Post()
  @ApiSecurity('bearerAuth')
  @UseGuards(JwtAuthzGuard)
  createModality(
    @User() user: TLoggedUser,
    @Body() createModalityDto: CreateModalityDto,
  ) {
    return this.createModalityService.execute(user, createModalityDto);
  }
}
