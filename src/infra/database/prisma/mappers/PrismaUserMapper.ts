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
      verified: user.verified,
      district: user.district,
      password: user.password,
      photo_url: user.photo_url,
      birth_date: user.birth_date,
      modality_id: user.modality_id,
      house_number: user.house_number,
      amount_class: user.amount_class,
      graduation_id: user.graduation_id,
      organization_id: user.organization_id,
    };
  }
}
