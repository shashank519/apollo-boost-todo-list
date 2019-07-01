import { GET_TODO_LIST } from './../queries/TodoListQueries';

export default {
	changeListTitle: (_root, args, { cache, getCacheKey }) => {
		cache.writeData({ data: { tdTitle: args.listTitle } });
		return null;
	},
	deleteTodo: (root, args, { cache, getCacheKey }) => {
		const { todos } = cache.readQuery({ query: GET_TODO_LIST });
		const filterTodos = todos.filter((todo, index) => todo.id !== args.id);
		cache.writeData({ data: { todos: filterTodos } });
	},
	toggleCompleted: (root, args, { cache, getCacheKey }) => {
		const { todos } = cache.readQuery({ query: GET_TODO_LIST });
		const updatedArr = todos.map((todo, ind) =>
			todo.id === args.id ? { ...todo, isCompleted: !todo.isCompleted } : todo
		);
		cache.writeData({ data: { updatedArr } });
	},
};
