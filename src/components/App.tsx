import { useState, useRef, useEffect } from "react";
import { ITodo } from "../types/data";
import { TodoList } from "./TodoList";
import styles from "./App.module.css";

const App: React.FC = () => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState<ITodo[]>(() => {
    const temp = localStorage.getItem("todos");
    const initialValue = temp ? JSON.parse(temp) : [];
    return initialValue;
  });
  const [count, setCount] = useState(() => {
    const temp = localStorage.getItem("count")
    const initialValue = temp ? JSON.parse(temp) : 0;
    return initialValue;
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = () => {
    if (value) {
      setTodos([...todos, {
        id: Date.now(),
        title: value,
        completed: false,
      }]);
      setValue("");
      setCount(count + 1);
    }
  }

  const removeTodo = (id: number) :void => {
    setTodos(todos.filter((todo) => todo.id !== id));
    todos.forEach((todo) => {
      if(todo.id === id) {
        if (!todo.completed) setCount(count - 1);
      }
    })
  }

  const toggleTodo = (id: number) :void => {
    setTodos(todos.map((todo) => {
      if (todo.id !== id) return todo;

      if (todo.completed) {
        setCount(count + 1);
      } else {
        setCount(count - 1);
      }

      return {
        ...todo,
        completed: !todo.completed,
      }
    }));
  }

  const saveTodo = () => {
    localStorage.setItem("count", JSON.stringify(count));
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    };
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") addTodo();
  }

  return <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Список дел</h1>
        <div className={styles.form}>
          <input value={value} onChange={handleChange} onKeyDown={handleKeyDown} ref={inputRef} />
          <button onClick={addTodo}>Добавить</button>
        </div>
      <TodoList items={todos} removeTodo={removeTodo} toggleTodo={toggleTodo}/>
      <p>Осталось выполнить дел: {count}</p>
      <button onClick={saveTodo}>Сохранить изменения</button>
    </div>
  </div>;
}

export { App };