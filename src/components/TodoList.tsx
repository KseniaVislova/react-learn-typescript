import React from "react";
import { TodoItem } from "./TodoItem";
import { ITodo } from "../types/data";
import styles from "./TodoList.module.css";

interface ITodoListProps {
  items: ITodo[];
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

const TodoList: React.FC<ITodoListProps> = (props) => {
  const {items, removeTodo, toggleTodo} = props;

  return <div className={styles.wrapper}>
    {
      items.map((item) => (
        <TodoItem 
        key={item.id} 
        {...item} 
        removeTodo={removeTodo} 
        toggleTodo={toggleTodo}/>))
    }
  </div>;
};

export { TodoList };