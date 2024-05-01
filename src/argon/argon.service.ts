import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';

@Injectable()
export class ArgonService {
  async hashPassword(password: string): Promise<string> {
    return await argon.hash(password);
  }

  async comparePassword(password: string, hashed: string): Promise<boolean> {
    return await argon.verify(hashed, password);
  }
}
