import axios from "axios";

class TodosService {
  private BASE_URL: string = "http://localhost:3000/todos";

  async fetchAllTodos(): Promise<Todo[]> {
    const response = await axios.get(this.BASE_URL);
    return response.data;
  }

  async fetchTodoById(id: string): Promise<Todo> {
    const response = await axios.get(`${this.BASE_URL}/${id}`);
    return response.data;
  }

  async createTodo(todo: Todo): Promise<Todo> {
    const response = await axios.post(this.BASE_URL, todo);
    return response.data;
  }

  async deleteTodoById(id: string): Promise<void> {
    await axios.delete(`${this.BASE_URL}/${id}`);
  }
}

export default TodosService;
