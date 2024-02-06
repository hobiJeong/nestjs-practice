import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  getCommonHello() {
    return 'common hello';
  }
}
