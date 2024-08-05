import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private repository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<Todo> {
    return this.repository.findOneBy({ id });
  }

  create(todo: Todo): Promise<Todo> {
    return this.repository.save(todo);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
