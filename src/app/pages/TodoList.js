import React from 'react';
import { Mutation, Query } from 'react-apollo';

import {
  CHANGE_LIST_TITLE,
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_COMPLETED,
} from './../graphql/mutations/TodoListMutations';
import {
  GET_LIST_TITLE,
  GET_TODO_LIST,
} from './../graphql/queries/TodoListQueries';

class TodoList extends React.Component {
  constructor() {
    super();

    this.todoRef = '';
  }

  render() {
    return (
      <div>
        <div style={{ margin: '10px 0' }}>
          <div style={{ display: 'inline' }}>
            <Mutation mutation={CHANGE_LIST_TITLE}>
              {(changeListTitle, { data, cache }) => (
                <input
                  type="text"
                  onChange={e =>
                    changeListTitle({
                      variables: { listTitle: e.target.value },
                    })
                  }
                />
              )}
            </Mutation>
          </div>
          <Query query={GET_LIST_TITLE}>
            {({ loading, error, data }) => {
              return (
                <div style={{ display: 'inline', marginLeft: '10px' }}>
                  Name: {data.tdTitle}
                </div>
              );
            }}
          </Query>
        </div>
        <div style={{ marginTop: '50px', marginRight: '30px' }}>
          <div>
            <Mutation
              mutation={ADD_TODO}
              update={(cache, { data }) => {
                const { todos } = cache.readQuery({ query: GET_TODO_LIST });
                console.log('dsfdf', todos);
                const newTodo = {
                  id: todos.length + 1,
                  title: this.todoRef.value,
                  isCompleted: false,
                  __typename: 'ListItem',
                };
                let newTodoList = [...todos, newTodo];
                cache.writeData({ data: { todos: newTodoList } });
              }}
            >
              {(addTodoItem, { data, cache }) => (
                <div>
                  <input
                    type="text"
                    placeholder="Add Todo"
                    style={{ width: '300px' }}
                    ref={node => (this.todoRef = node)}
                  />
                  <button onClick={addTodoItem}>Add Todo</button>
                </div>
              )}
            </Mutation>
          </div>
          <div style={{ marginTop: '10px' }}>
            <Query query={GET_TODO_LIST}>
              {({ data, error, loading }) => {
                return data.todos.map((todo, index) => {
                  return (
                    <li key={todo.id}>
                      <Mutation mutation={TOGGLE_COMPLETED}>
                        {(toggleCompleted, { data, error }) => (
                          <label
                            onClick={() =>
                              toggleCompleted({ variables: { id: todo.id } })
                            }
                          >
                            {todo.isCompleted ? (
                              <strike>{todo.title}</strike>
                            ) : (
                              todo.title
                            )}
                          </label>
                        )}
                      </Mutation>
                      <Mutation mutation={DELETE_TODO}>
                        {(deleteTodo, { data }) => {
                          return (
                            <span
                              style={{ marginLeft: '50px', cursor: 'pointer' }}
                              onClick={() =>
                                deleteTodo({ variables: { id: todo.id } })
                              }
                            >
                              X
                            </span>
                          );
                        }}
                      </Mutation>
                    </li>
                  );
                });
              }}
            </Query>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoList;
