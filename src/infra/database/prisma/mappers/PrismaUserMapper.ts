import { User } from 'src/application/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,

      cpf: user.cpf,
      phone: user.phone,
      birthDate: user.birthDate,
      total_class: user.total_class,

      cep: user.cep,
      state: user.state,
      city: user.city,
      street: user.street,
      number: user.number,
      district: user.district,

      graduation: user.graduation,
      color_graduation: user.color_graduation,

      active: user.active,
      verified: user.verified,

      plano: user.plano,
      payday: user.payday,

      modality: user.modality,
      organization: user.organization,

      createAt: user.createdAt,
    };
  }
}
