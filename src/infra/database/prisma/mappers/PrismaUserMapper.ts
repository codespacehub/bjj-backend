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
      payday: user.payday,
      street: user.street,
      active: user.active,
      degree: user.degree,
      verified: user.verified,
      password: user.password,
      district: user.district,
      modality: user.modality,
      birth_date: user.birth_date,
      graduation: user.graduation,
      house_number: user.house_number,
      organization: user.organization,
      amount_class: user.amount_class,
      color_graduation: user.color_graduation,
    };
  }
}
