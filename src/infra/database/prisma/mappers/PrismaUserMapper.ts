import { User } from 'src/application/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      cpf: user.cpf,
      name: user.name,
      role: user.role,
      plan: user.plan,
      phone: user.phone,
      email: user.email,
      payday: user.payday,
      active: user.active,
      verified: user.verified,
      password: user.password,
      birth_date: user.birth_date,
      graduation: user.graduation,
      total_class: user.total_class,
      organization: user.organization,
      color_graduation: user.color_graduation,
    };
  }
}
