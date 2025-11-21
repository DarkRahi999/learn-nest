import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Request } from "@nestjs/common";
import { CustomJwtService } from "../config/jwt/jwt.service";
import { LoginDto } from "./dto/logIn.dto";
import { RefreshTokenDto } from "./dto/refreshToken.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly jwtService: CustomJwtService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    // Simple validation - in a real app, you'd check against a database
    if (
      loginDto.email === "admin@example.com" &&
      loginDto.password === "admin123"
    ) {
      const payload = {
        sub: 1,
        email: loginDto.email,
        role: "user",
      };

      const accessToken = await this.jwtService.generateToken(payload, '30d');

      return {
        accessToken,
        user: {
          id: 1,
          email: loginDto.email,
        },
      };
    }

    return { error: "Invalid credentials" };
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    try {
      const payload = await this.jwtService.validateToken(refreshTokenDto.refreshToken);
      
      if (!payload) {
        return { error: "Invalid refresh token" };
      }
      
      const newAccessToken = await this.jwtService.generateToken(
        {
          sub: payload.sub,
          email: payload.email,
          role: payload.role,
        }, 
        '30d'
      );
      
      return {
        accessToken: newAccessToken,
      };
    } catch (error) {
      return { error: "Invalid refresh token" };
    }
  }
}