import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    console.log(value, metatype);
    /**
     * metatype이 pipe가 지원하는 타입인지 검사
     */
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    /**
     * 자바스크립트 객체(plain or literal)fmf 클래스의 객체로 변환.
     * 네트워크 요청을 통해 들어온 데이터는 역직렬화 과정에서 본문의 객체가 아무런 타입 정보도 가지고 있지 않음.
     * 따라서 타입을 지정하는 변환 과정을 plainToClass로 수행.
     */
    const object = plainToClass(metatype, value);

    console.log(object);

    const errors = await validate(object);

    console.log(errors);

    /**
     * 에러가 있다면 에러 던짐.
     * 없다면 그대로 return
     */
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];

    return !types.includes(metatype);
  }
}
