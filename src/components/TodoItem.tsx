import { ITodo } from "../types/data";
import styles from "./TodoItem.module.css";
import classnames from "classnames";

interface ITodoItem extends ITodo {
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
 }

const TodoItem: React.FC<ITodoItem> = (props) => {
  const {id, title, completed, removeTodo, toggleTodo} = props;

  return <div className={styles.wrapper}>
    <div className={styles.item}>
      <input className={styles.checkbox} type="checkbox" checked={completed} onChange={() => toggleTodo(id)}/>
      <span className={classnames([""], {[styles.completed]: completed})}>{title}</span>
    </div>
    <button className={styles.cross} onClick={() => removeTodo(id)}>x</button>
  </div>;
};

export { TodoItem };