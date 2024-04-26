import { User } from '../entities/user';
import { CreateAndUpdateUserDto } from '@/infra/http/modules/user/dtos/create-and-update-user.dto';

export interface UserProps extends User {

  Plan?: {
    id: string;
    name: string;
    value: number;
    limit: number;
    description?: string;
    organization_id: string;
    updated_at: Date | null;
    created_at: Date;
  };
  Organization?: {
    id: string;
    name: string;
    cnpj: number;
    phone: string;
    email: string;
    domain: string;
    payment_method_value: string;
    active: boolean;
    updated_at: Date | null;
    created_at: Date;
  };
  Graduation?: {
    id: string;
    name: string;
    order: number;
    amount_class: number;
    modality_id: string;
    organization_id: string;
    updated_at: Date | null;
    created_at: Date;
  };
  Modality: {
    id: string;
    name: string;
    description?: string;
    organization_id: string;
    updated_at: Date | null;
    created_at: Date;
  }[];
  Invoices: {
    id: string;
    value: number;
    paidDay: string;
    PaidOut: string;
    user_id: string;
    organization_id: string;
    updated_at: Date | null;
    created_at: Date;
  }[];
  Presences: {
    id: string;
    day: string;
    confirmation: boolean;
    user_id: string;
    time_id: string;
    modality_id: string;
    organization_id: string;
    updated_at: Date | null;
    created_at: Date;
  }[];
  times: {
    id: string;
    hour: string;
    user_id: string;
    modality_id: string;
    organization_id: string;
    updated_at: Date | null;
    created_at: Date;
  }[]
}

export interface IUserRepository {
  create(user: User): Promise<User>;
  updateAmountClass(userId: string);
  remove(userId: string): Promise<void>;
  findById(userId: string): Promise<UserProps>;
  findByEmail(email: string): Promise<User>;
  findExistUserByEmail(email: string): Promise<User>;
  findAll(organization: string): Promise<User>;
  updateActiveById(userId: string): Promise<void>;
  updatePassword(userId: string, newPassword: string): Promise<User>;
  updateGraduationForUser(userId: string, graduationId: string): Promise<User>;
  update(userId: string, updateUserDto: CreateAndUpdateUserDto): Promise<User>;
}
