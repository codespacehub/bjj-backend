import { CreateAndUpdateUserDto } from '@/infra/http/modules/user/dtos/create-and-update-user.dto';
import { User } from '../entities/user';

export interface IUserRepository {
  create(user: User): Promise<User>;
  remove(userId: string): Promise<void>;
  findById(userId: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  updatePassword(userId: string, newPassword: string): Promise<User>;
  updateGraduation(userId: string, newGraduation: string): Promise<User>;
  update(userId: string, updateUserDto: CreateAndUpdateUserDto): Promise<User>;
}
