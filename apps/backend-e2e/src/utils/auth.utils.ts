import jwtConfig from '@trends/backend/src/app/config/jwt.config';
import { JwtService } from '@nestjs/jwt';

const jwtService = new JwtService(jwtConfig());

export function tokenFactory(username: string) {
  return jwtService.sign({ username });
}

export function authHeaderFactory(username: string) {
  const token = tokenFactory(username);
  return `Bearer ${token}`;
}
