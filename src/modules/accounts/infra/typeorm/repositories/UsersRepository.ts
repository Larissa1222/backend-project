import { getRepository, Repository } from "typeorm";

import {
  ICreateUserDTO,
  IUsersRepository,
} from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    password,
    email,
    driver_license,
    avatar,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      password,
      email,
      driver_license,
      avatar,
      id,
    });

    await this.repository.save(user);
  }
  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email });
  }
  async findById(id: string): Promise<User> {
    return this.repository.findOne(id);
  }
}
