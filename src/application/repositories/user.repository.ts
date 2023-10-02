import { User } from '../entities/user';

export interface IUserRepository {
  findByEmail(email: string): Promise<User>;
  create(user: User): Promise<User>;
}
