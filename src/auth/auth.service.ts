import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configSerivce: ConfigService,
  ) {}
  async signin(signInDto: SignInDto) {
    // Setup Variable
    const username = signInDto.username;
    const password = signInDto.password;
    // Find Username is exist
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    if (!user) throw new ForbiddenException('Credentials Incorrect');
    // Check password is match?
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ForbiddenException('Credential Incorrect');
    return this.signToken(user.id, user.username);
  }
  async signup(signUpDto: SignUpDto) {
    // Check Unique variable: email, username, ...
    // hash password
    // create user
    // return the user without password
    const password = signUpDto.password;
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltOrRounds);
    try {
      const user = await this.prisma.user.create({
        data: {
          ...signUpDto,
          password: hashPassword,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
      // Error from Prisma
      if (error instanceof PrismaClientKnownRequestError) {
        // Error when duplicate
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credential Taken');
        }
      }
    }
  }
  async signToken(
    userId: number,
    username: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      username,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: this.configSerivce.get('JWT_SECRET'),
    });

    return {
      access_token: token,
    };
  }
}
