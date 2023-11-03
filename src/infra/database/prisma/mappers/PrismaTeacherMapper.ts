import { Teacher } from '@/application/entities/teacher';

export class PrismaTeacherMapper {
  static toPrisma(teacher: Teacher) {
    return {
      id: teacher.id,
      uf: teacher.uf,
      cep: teacher.cep,
      cpf: teacher.cpf,
      name: teacher.name,
      city: teacher.city,
      phone: teacher.phone,
      email: teacher.email,
      street: teacher.street,
      active: teacher.active,
      verified: teacher.verified,
      password: teacher.password,
      district: teacher.district,
      modality: teacher.modality,
      birth_date: teacher.birth_date,
      house_number: teacher.house_number,
      organization: teacher.organization,
    };
  }
}
