import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  register(createUserDto: CreateUserDto): Promise<number> {
    return this.usersService.create(createUserDto);
  }

  async login(loginDto: LoginDto): Promise<number> {
    const userId = await this.usersService.validate(
      loginDto.email,
      loginDto.password,
    );

    if (userId === null) {
      throw new BadRequestException('Correo o contraseña incorrectos');
    }

    return userId;
  }
}
