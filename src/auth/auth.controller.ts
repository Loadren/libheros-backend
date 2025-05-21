import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from './interfaces/request-with-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard) // This kicks in before the login method and reconstruct the req.user as a valid user
  @Post('login')
  async login(
    @Request() req: RequestWithUser,
  ): Promise<{ access_token: string }> {
    return this.authService.login(req.user);
  }
}
