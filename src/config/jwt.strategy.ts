import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { jwtConfig } from "./jwt/jwt.config";

// Custom token extractor to handle potential formatting issues
const customExtractor = (req: any) => {
  let token: string | null = null;
  if (req && req.headers && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    
    // Handle double Bearer issue from Swagger
    if (authHeader.startsWith('Bearer Bearer ')) {
      // Extract token after "Bearer Bearer "
      token = authHeader.substring(14);
    } 
    // Check if it's a single Bearer token
    else if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
    
    // Clean the token of any extra characters
    if (token) {
      token = token.trim();
    }
  }
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: customExtractor,
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: any) {
    // Validate that the payload has the required fields
    if (!payload || !payload.sub || !payload.email) {
      throw new UnauthorizedException('Invalid token payload');
    }
    
    // Return the user object that will be attached to the request
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}