import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

import TodoResolvers from './../resolvers/TodoListResolvers';

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
	cache,
	uri: 'https://48p1r2roz4.sse.codesandbox.io',
	resolvers: {
		Mutation: {
			changeListTitle: TodoResolvers.changeListTitle,
			deleteTodo: TodoResolvers.deleteTodo,
			toggleCompleted: TodoResolvers.toggleCompleted,
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
