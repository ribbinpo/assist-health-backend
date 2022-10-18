import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

interface ValidateProps {
  sub: number;
  username: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configSerive: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      secretOrKey: configSerive.get('JWT_SECRET'),
    });
  }
  async validate(payload: ValidateProps) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    const role = await this.prisma.role.findFirst({
      where: {
        id: user.role_id,
      },
    });
    delete user.password;
    return { username: user.username, roles: role.role };
  }
}
