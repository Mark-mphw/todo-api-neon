import { Module } from '@nestjs/common';
import { TodoService } from './todos.service';
import { TodoController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodoService],
  controllers: [TodoController]
})
export class TodoModule {}
