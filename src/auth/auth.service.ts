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
    const { role } = await this.prisma.role.findFirst({
      where: { id: user.role_id },
    });
    return this.signToken(user.id, user.username, role);
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
          // ...signUpDto,
          username: signUpDto.username,
          password: hashPassword,
          firstName: signUpDto.firstName,
          lastName: signUpDto.lastName,
          email: signUpDto.email,
          country: signUpDto.country,
          role_id: signUpDto.role_id,
        },
        include: {
          role: true,
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
    roles: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      username,
      roles,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret: this.configSerivce.get('JWT_SECRET'),
    });

    return {
      access_token: token,
    };
  }
}
