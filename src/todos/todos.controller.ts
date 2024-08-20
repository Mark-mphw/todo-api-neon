import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';
import { TodoService } from './todos.service';
import { Todo } from './todos.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    create(@Body() todos: Todo) {
        return this.todoService.create(todos);
    }

    @Get()
    findAll() {
        return this.todoService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.todoService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateTodo: UpdateTodoDto) {
        return this.todoService.update(+id, updateTodo);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        this.todoService.remove(+id);
    } 
}
