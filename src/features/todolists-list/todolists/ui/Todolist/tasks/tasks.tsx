import React, { FC } from "react";
import { Task } from "./task/task";
import List from "@mui/material/List";
import {TaskStatuses} from "../../../../../../common/enums";
import {TaskType} from "../../../../tasks/api/tasks.api.types";
import {TodolistDomainType} from "../../../model/todolists.slice";


type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Tasks: FC<Props> = ({ tasks, todolist }) => {
  // const tasks = useAppSelector(selectTasks)[todolistId]
  let tasksForTodolist = tasks;

  if (todolist.filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }

  if (todolist.filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <>
      {tasksForTodolist.length ? (
        <List>
          {tasksForTodolist.map((t) => (
            <Task key={t.id} task={t} todolistId={todolist.id} />
          ))}
        </List>
      ) : (
        <div>Your list is empty</div>
      )}
    </>
  );
};
