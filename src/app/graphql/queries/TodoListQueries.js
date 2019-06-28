import gql from 'graphql-tag';

export const GET_LIST_TITLE = gql`
	query GetListTitle {
		tdTitle @client
	}
`;

export const GET_TODO_LIST = gql`
	query GetTodoList {
		todos @client {
			id
			title
			isCompleted
		}
	}
`;
