import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) throw new BadRequestException('Email already in use');
    const user = await this.usersService.create(dto);

    // Exclude password
    const result = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return result;
  }
}

// src/auth/constants.ts
export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'CHANGE_ME',
};

// src/auth/dto/login.dto.ts
export class LoginDto {
  email: string;
  password: string;
}
