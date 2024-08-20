import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todos.controller';
import { TodoService } from './todos.service';
import { Todo } from './todos.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  const mockTodoService = () => ({
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    remove: jest.fn().mockResolvedValue({}),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: mockTodoService(),
        },
        {
          provide: getRepositoryToken(Todo),
          useValue: {} as Repository<Todo>,
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Add more tests for your controller methods
});
