import { createStore, combineReducers } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';


// const counter = (state = 0, action) => {
//     switch(action.type) {
//         case 'INCREMENT': {
//             return state + 1;
//         }
//         case 'DECREMENT': {
//             return state - 1;
//         }
//         default: {
//             return state;
//         }
//     }
// }

// const Counter = ({ 
//     value,
//     onIncrement,
//     onDecrement

// }) => (
//     <div>
//     <h1>{value}</h1>
//     <button onClick = {onIncrement}>+</button>
//     <button onClick = {onDecrement}>-</button>
//     </div>
// );

// const store = createStore(counter);

// const render = () => {
//     ReactDOM.render(
//         <Counter value={store.getState()}
//         onIncrement={()=>
//         store.dispatch({
//             type: 'INCREMENT'
//             })
//         }
//         onDecrement={()=>
//             store.dispatch({
//                 type: 'DECREMENT'
//             })
//         }
//         />,
//         document.getElementById('root')
//     );
// }

// store.subscribe(render);
// render();

const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO': {
            return {
                id:action.id,
                text:action.text,
                completed: false
            };
        }
        case 'TOGGLE_TODO': {
            if(state.id !== action.id){
                return state;
            }

            return {
                ...state,
                completed: !state.completed
            };
        }
        default: {
            return state;
        }
    }
}

const todos = (state = [], action) => {
    switch(action.type) { 
        case 'ADD_TODO': {
            return [
                ...state,
                todo(undefined,action)
            ];
        }

        case 'TOGGLE_TODO': {
            return state.map(t => todo(t,action));
        }
        default: {
            return state;
        }
    }
};

const visibilityFilter = (state = 'SHOW_ALL',action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER': {
            return action.filter
        }
        default:{
            return state;
        }
}
};

// const todoApp = (state = {}, action) => {
//     return {
//         todos: todos(
//             state.todos,
//             action
//         ),
//         visibilityFilter: visibilityFilter(
//             state.visibilityFilter,
//             action
//         )
//     };
// };

// const combineReducers = (reducers) => {
//     return (state = {}, action) => {
//         return Object.keys(reducers).reduce(
//             (nextState, key ) => {
//                 nextState[key] = reducers[key](
//                     state[key],
//                     action
//                 );
//             return nextState;
//             },
//             {}
//         );
//     }
// }

const todoApp = combineReducers({
    todos,
    visibilityFilter,
});

const { Component } = React;

let nextTodoId = 0;
class TodoApp extends Component {
    render() {
        return (
            <div>
                <input placeholder='Insert a task' ref={node => {
                    this.input = node;
                }}></input>
                <button onClick = {() => {
                    store.dispatch({
                        type: 'ADD_TODO',
                        text: this.input.value,
                        id: nextTodoId++
                    });
                    this.input.value = '';
                }}>
                    Add Todo
                </button>
                <ul>
                    {this.props.todos.map(todo => 
                        <li key={todo.id}
                            onClick = {() => {
                               store.dispatch({
                                type: 'TOGGLE_TODO',
                                id: todo.id
                            });
                            }}
                            style ={{
                                textDecoration:
                                    todo.completed ? 'line-through' :
                                    'none'
                            }}>
                            {todo.text}
                        </li>
                        )}
                </ul>
            </div>
        );
    }
}

const store = createStore(todoApp);

const render = () => {
    ReactDOM.render(
        <TodoApp 
            todos={store.getState().todos}
            
        />,
        document.getElementById('root')
    );
};


store.subscribe(render);
render();
