import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { StringValue } from "ms";

export interface JwtPayload {
  sub: number;
  email: string;
  role: string;
}

@Injectable()
export class CustomJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: JwtPayload, expiresIn?: string): Promise<string> {
    return this.jwtService.sign(payload, { expiresIn: expiresIn as StringValue | undefined });
  }

  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }
}
