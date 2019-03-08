import React from 'react'
import TodoForm from './components/TodoComponents/TodoForm'
import TodoList from './components/TodoComponents/TodoList'
import './components/TodoComponents/Todo.css'


localStorage.getItem('state')

class App extends React.Component {
  // you will need a place to store your state in this component.
  // design `App` to be the parent component of your application.
  // this component is going to take care of state, and any change handlers you need to work with your state
  constructor(props){
    super(props);
    this.state =
      {Todos: 
        [
          {task: 'watch this week\'s The Orville',
          id: 1528817077286,
          completed: false},
          {task: 'watch this week\'s Star Trek Discovery',
          id: 1528817071031,
          completed: false},
        ],
        Todo: '',
      }  //state is short list of static todo tasks in Todos; Todo is set to an empty string by default--our input will change its value when we setState
  }

  newTodo = (event) => this.setState({Todo: event.target.value}) //newTodo is a function to set the state of Todo to the entered value when called

  addTask = (event) => {  //function to add a task to the Todos list
    event.preventDefault()  //prevents addTask from refreshing browser when called
    let tempStr = this.state.Todo  //declares tempStr variable, set it to hold value of this state's Todo
    tempStr = tempStr.replace(/\s+/g, '') //sets tempStr to equal tempStr with spaces replaced by empty strings; if there's nothing but spaces, the length of tempStr is 0, which comes in handy...
    if (tempStr.length != 0){ //...here, where if no visible characters are entered in the input string, the task isn't added
      const tempTodos = this.state.Todos.slice()  //slices Todos array so we can manipulate data in the slice
      tempTodos.push({ task: this.state.Todo, id: Date.now(), completed: false, })  //pushes this state's todo to the end of the slice
      this.setState({Todos: tempTodos, Todo: ' '})  //sets state's Todos to now hold the updates tempTodos; resets Todo to an empty string
    }
  }

  strikeThrough = (id) => {  //strikeThrough function, called by toggleStrike prop in TodoList component, takes id from the props of the Todo that calls it
    let todos = this.state.Todos.slice() //variable todos is set to a slice of Todos from state, again to keep from interacting directly with the state
    todos = todos.map( todo => { //todos is set to contain a mapping of itself, passing argument todo
      if (todo.id === id){  //if this todo id is identical to the id passed to strikeThrough
        todo.completed = !todo.completed //the todo completed status is toggled to its opposite
        return todo  //returns todo as modified
      } else {  //otherwise
        return todo  //function returns todo unchanged
      }
    }
    )
    this.setState({ todos })  //modified todos is set to state
  }

  clearCompleted = (event) => {  //clearCompleted function
    let Todos = this.state.Todos.slice()  //again, slicing to protect state, into variable Todos
    Todos = Todos.filter (Todo => !Todo.completed)  //Todos is set to a subset of itself, filtering completed todos
    this.setState({ Todos })  //state is set to our modified Todos array
  }

  render() {
    return (
      <div className='container'>
        <div>
          <h1>todo list</h1>
          <h2>sci-fi watchlist edition</h2>
          <TodoList todos={this.state.Todos} toggleStrike={this.strikeThrough} />
          <TodoForm changeInput={this.newTodo} addTodo={this.addTask} clearCompleted={this.clearCompleted} vOS={this.state.Todo}/>
        </div>
        <div className='imageHolder'>
          <img src={require("./USS_Discovery.jpg")} />
        </div>
      </div>

    );
  }
}

export default App;
