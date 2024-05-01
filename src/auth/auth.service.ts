import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { ArgonService } from 'src/argon/argon.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private hashUser: ArgonService,
  ) {}

  async signup(dto: AuthDto): Promise<{}> {
    //geterate password
    const hash = await this.hashUser.hashPassword(dto.password);
    //save new user in the DB
    try {
      //return saved user
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      delete user.hash;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        //Check for dulicate key(rpeated email)
        if (error.code === 'P2002') {
          throw new ForbiddenException('User Already Exist!');
        }
      } else {
        throw new Error('Soemthign went worng!');
      }
    }
  }

  async signin(dto: AuthDto): Promise<{}> {
    //find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    //if user does not exist
    if (!user) {
      throw new ForbiddenException('User not Found');
    }

    //compare password
    const pwMatches = await this.hashUser.comparePassword(
      dto.password,
      user.hash,
    );
    //if passwor dincoreect throe exception
    if (!pwMatches) {
      throw new ForbiddenException('Password or email Invalid!');
    }
    //send back the user

    delete user.hash;
    return user;
  }
}
