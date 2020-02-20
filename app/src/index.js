import { createStore } from 'redux';

const counter = (state = 0, action) => {
    switch(action.type) {
        case 'INCREMENT': {
            return state + 1;
        }
        case 'DECREMENT': {
            return state - 1;
        }
        default: {
            return state;
        }
    }
}

const store = createStore(counter);

const render = () => {
    document.body.innerText = store.getState();
}

store.subscribe(render);
render();

document.addEventListener('click', () => {
    store.dispatch({type: 'INCREMENT'});
});




// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
