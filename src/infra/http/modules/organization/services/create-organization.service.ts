import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IOrganizationRepository } from 'src/application/repositories/organization.repository';
import { CreateOrganizationDto } from '../dtos/create-organization.dto';
import { Organization } from 'src/application/entities/organization';
import { generateTemporaryPassword } from 'src/shared/utils/generate-temporary-password';
import { ICreateHash } from 'src/shared/interface/bcryptjs/create-hash.interface';
import { CreateUserService } from '../../user/services/create-user.service';

@Injectable()
export class CreateOrganizationService {
  constructor(
    @Inject()
    private readonly organizationRepository: IOrganizationRepository,
    private readonly createHashAdapterProvider: ICreateHash,
    private readonly createUserService: CreateUserService,
  ) {}

  async execute(createOrganizationDto: CreateOrganizationDto): Promise<any> {
    const findOrganizationExists = await this.organizationRepository.findByCnpj(
      createOrganizationDto.cnpj,
    );

    if (findOrganizationExists) {
      throw new ConflictException(
        '🥲 Essa organização já foi criada, tente novamente',
      );
    }

    const organization = new Organization({
      cnpj: createOrganizationDto.cnpj,
      name: createOrganizationDto.name,
      email: createOrganizationDto.email,
      domain: createOrganizationDto.domain,
      phone: createOrganizationDto.phone,
    });

    const organizationId =
      await this.organizationRepository.create(organization);

    const password = generateTemporaryPassword();
    const passwordHash = this.createHashAdapterProvider.execute(password);

    const user = await this.createUserService.execute;

    // return createOrganizationDto,
  }
}
