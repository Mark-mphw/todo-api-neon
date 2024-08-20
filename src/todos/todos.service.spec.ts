import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todos.service';
import { Todo } from './todos.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('TodoService', () => {
  let service: TodoService;
  let repository: Repository<Todo>;

  const mockTodoRepository = () => ({
    findOneBy: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    find: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        { provide: getRepositoryToken(Todo), useValue: mockTodoRepository() },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    repository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('update', () => {
    it('should update a todo item', async () => {
      const mockTodo = { id: '1', title: 'Test Todo', description: 'Test Description', is_completed: false };
      const updateTodoDto = { title: 'Updated Title' };

      repository.findOneBy = jest.fn().mockResolvedValue(mockTodo);
      repository.save = jest.fn().mockResolvedValue({ ...mockTodo, ...updateTodoDto });

      const result = await service.update(1, updateTodoDto);
      expect(result.title).toBe('Updated Title');
    });

    it('should throw an error if todo item not found', async () => {
      repository.findOneBy = jest.fn().mockResolvedValue(null);

      await expect(service.update(1, { title: 'Updated Title' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const mockTodos = [{ id: '1', title: 'Test Todo', description: 'Test Description', is_completed: false }];
      repository.find = jest.fn().mockResolvedValue(mockTodos);

      const result = await service.findAll();
      expect(result).toEqual(mockTodos);
    });
  });
});
