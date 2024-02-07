import { SetMetadata } from '@nestjs/common';
import { TYPE_ORM_EX_CUSTOM_REPOSITORY } from '../constants/type-orm.token';

export function CustomRepository(entity: any): ClassDecorator {
  return SetMetadata(TYPE_ORM_EX_CUSTOM_REPOSITORY, entity);
}
