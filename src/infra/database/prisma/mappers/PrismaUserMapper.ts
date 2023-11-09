import { User } from 'src/application/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      uf: user.uf,
      cep: user.cep,
      cpf: user.cpf,
      name: user.name,
      city: user.city,
      role: user.role,
      plan: user.plan,
      phone: user.phone,
      email: user.email,
      degree: user.degree,
      payday: user.payday,
      street: user.street,
      active: user.active,
      verified: user.verified,
      password: user.password,
      graduation: user.graduation,
      district: user.district,
      modality: user.modality,
      birth_date: user.birth_date,
      house_number: user.house_number,
      organization: user.organization,
      amount_class: user.amount_class,
    };
  }
}
