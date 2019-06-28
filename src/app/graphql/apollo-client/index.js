import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { GET_TODO_LIST } from './../queries/TodoListQueries';

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
	cache,
	uri: 'https://48p1r2roz4.sse.codesandbox.io',
	resolvers: {
		Mutation: {
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
				console.log('Toggling');
				const { todos } = cache.readQuery({ query: GET_TODO_LIST });
				console.log(args);
				const updatedArr = todos.map((todo, ind) =>
					todo.id === args.id
						? { ...todo, isCompleted: !todo.isCompleted }
						: todo
				);
				console.log(updatedArr);
				cache.writeData({ data: { updatedArr } });
			},
		},
	},
});

const data = {
	tdTitle: 'This is title two',
	todoTitle: {
		__typename: 'TodoTitle',
		isCompleted: false,
		title: 'This is title',
	},
	todos: [
		{
			id: 101,
			title: 'This is task one',
			isCompleted: false,
			__typename: 'ListItem',
		},
	],
	networkStatus: {
		__typename: 'NetworkStatus',
		isConnected: false,
	},
};

cache.writeData({ data });

export default apolloClient;
