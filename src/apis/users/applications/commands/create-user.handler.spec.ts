import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UUID } from 'crypto';
import { CreateUserCommand } from 'src/apis/users/applications/commands/create-user.command';
import { CreateUserHandler } from 'src/apis/users/applications/commands/create-user.handler';
import { UserRole } from 'src/apis/users/constants/user-role.enum';
import { UserStatus } from 'src/apis/users/constants/user-status.enum';
import { User } from 'src/apis/users/domain/user';
import { UserFactory } from 'src/apis/users/domain/user.factory';
import { UserRepository } from 'src/apis/users/infra/db/repository/user.repository';

describe(CreateUserHandler.name, () => {
  let createUserHandler: CreateUserHandler;
  let userRepository: UserRepository;
  let userFactory: UserFactory;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateUserHandler,
        {
          provide: UserRepository,
          useValue: { saveUser: jest.fn() },
        },
        {
          provide: UserFactory,
          useValue: { create: jest.fn() },
        },
      ],
    }).compile();

    createUserHandler = module.get(CreateUserHandler);
    userRepository = module.get(UserRepository);
    userFactory = module.get(UserFactory);
  });

  const id = 1;
  const name = '정비호';
  const email = 'test@test.test';
  const password = 'testPassword';
  const signUpVerifyToken = '0000-0000-0000-0000' as UUID;
  const status = UserStatus.Inactive;
  const role = UserRole.User;

  describe(CreateUserHandler.prototype.execute.name, () => {
    let user: User;

    beforeEach(() => {
      user = new User(
        id,
        name,
        email,
        password,
        signUpVerifyToken,
        status,
        role,
      );
    });

    it('should execute CreateUserCommand', async () => {
      // Given
      userRepository.findByEmail = jest.fn().mockResolvedValue(null);
      userRepository.saveUser = jest.fn().mockResolvedValue(user);

      // When
      await createUserHandler.execute(
        new CreateUserCommand(name, email, password),
      );
      // Then
      expect(userFactory.create).toHaveBeenCalledWith(
        user.id,
        user.name,
        user.email,
        user.password,
        user.signupVerifyToken,
        user.status,
        user.role,
      );
    });

    it('should throw ConflictException when user exists', async () => {
      // Given
      userRepository.findByEmail = jest.fn().mockResolvedValue(user);

      // When

      // Then
      await expect(
        createUserHandler.execute(new CreateUserCommand(name, email, password)),
      ).rejects.toThrow(ConflictException);
    });
  });
});
