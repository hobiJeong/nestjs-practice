/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
  validate,
} from 'class-validator';

export function IsIncludeEmptyString(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isIncludeEmptyString',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          console.log(value);
          return !/\s/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'The $property property must not contain any whitespace.';
        },
      },
    });
  };
}
