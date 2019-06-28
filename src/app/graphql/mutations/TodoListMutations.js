import gql from 'graphql-tag';

export const CHANGE_LIST_TITLE = gql`
	mutation ChangeListTitle($listTitle: String!) {
		changeListTitle(listTitle: $listTitle) @client
	}
`;

export const ADD_TODO = gql`
	mutation AddTodoItem($title: String!) {
		addTodoItem(title: $title) @client
	}
`;

export const DELETE_TODO = gql`
	mutation DeleteTodo($id: String!) {
		deleteTodo(id: $id) @client
	}
`;

export const TOGGLE_COMPLETED = gql`
	mutation ToggleCompleted($id: String!) {
		toggleCompleted(id: $id) @client
	}
`;
