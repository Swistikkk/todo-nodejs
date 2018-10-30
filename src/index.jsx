import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './Todo.jsx';
import './index.css';

class App extends React.Component {
    render() {
        return <div className="app">
            <Todo />
        </div>
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);