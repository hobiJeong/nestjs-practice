import { EventBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UUID } from 'crypto';
import { UserRole } from 'src/apis/users/constants/user-role.enum';
import { UserStatus } from 'src/apis/users/constants/user-status.enum';
import { User } from './user';
import { UserFactory } from './user.factory';

describe(UserFactory.name, () => {
  let userFactory: UserFactory;
  let eventBus: jest.Mocked<EventBus>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: EventBus, useValue: { publish: jest.fn() } },
        UserFactory,
      ],
    }).compile();

    userFactory = module.get(UserFactory);
    eventBus = module.get(EventBus);
  });

  describe(UserFactory.prototype.create.name, () => {
    it('should create user', () => {
      // Given

      // When
      const user = userFactory.create(
        1,
        '정비호',
        'test@test.test',
        'testPassword',
        '0000-0000-0000-0000' as UUID,
        UserStatus.Inactive,
        UserRole.User,
      );
      // Then
      const expected = new User(
        1,
        '정비호',
        'test@test.test',
        'testPassword',
        '0000-0000-0000-0000' as UUID,
        UserStatus.Inactive,
        UserRole.User,
      );

      expect(expected).toEqual(user);
      expect(eventBus.publish).toHaveBeenCalledTimes(1);
    });
  });

  describe('reconstitute', () => {
    it('should reconstitute user', () => {
      // Given

      // When
      const user = userFactory.reconstitute(
        1,
        '정비호',
        'test@test.test',
        '0000-0000-0000-0000' as UUID,
        'testPassword',
        UserStatus.Active,
        UserRole.User,
      );

      // Then
      const expected = new User(
        1,
        '정비호',
        'test@test.test',
        'testPassword',
        '0000-0000-0000-0000' as UUID,
        UserStatus.Active,
        UserRole.User,
      );

      expect(expected).toEqual(user);
    });
  });
});
