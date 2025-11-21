import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  handleRequest(err: any, user: any, info: any) {
    // Check if there's a specific JWT error
    if (info && info.name === 'JsonWebTokenError') {
      if (info.message === 'jwt malformed') {
        throw new UnauthorizedException('Invalid token format. Please check your token.');
      }
    }
    
    // If we get a false user, it might be due to token issues
    if (user === false && !err) {
      throw new UnauthorizedException('Invalid token - ' + (info?.message || 'Token validation failed'));
    }
    
    if (err || !user) {
      throw err || new UnauthorizedException('Unauthorized access - ' + (info?.message || 'No user found'));
    }
    
    return user;
  }
}