import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todos.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
    ){}

    create (todos: Todo): Promise<Todo> {
        return this.todoRepository.save(todos);
    }

    findAll(): Promise<Todo[]> {
        return this.todoRepository.find();
    }

    findOne(id: number): Promise<Todo> {
        return this.todoRepository.findOneBy({ id });
    }

    async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
        const todo = await this.todoRepository.findOneBy({ id });

        if (!todo) {
            throw new NotFoundException(`Todo item with ID ${id} not found`);
        }

        Object.assign(todo, updateTodoDto);
        return await this.todoRepository.save(todo);
    }

    async remove(id: number): Promise<void> {
        await this.todoRepository.delete(id);
    }
}


