import React, { FC, memo, useCallback, useEffect } from "react";
import {TodolistDomainType} from "./model/todolists.slice";
import {TaskType} from "../tasks/api/tasks.api.types";
import {useActions} from "../../../common/hooks";
import {tasksThunks} from "../tasks/model/tasks.slice";
import {TodolistTitle} from "./ui/Todolist/todolist-title/todolist-title";
import {AddItemForm} from "../../../common/components";
import {Tasks} from "./ui/Todolist/tasks/tasks";
import {FilterTasksButtons} from "./ui/Todolist/filter-tasks-buttons/filter-tasks-buttons";


type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist: FC<Props> = memo(({ todolist, tasks }) => {
  const { fetchTasks, addTask } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  const addTaskCallBack = useCallback(
    (title: string) => {
      return addTask({ title, todolistId: todolist.id }).unwrap();
    },
    [todolist.id]
  );

  return (
    <div>
      <h3>
        <TodolistTitle todolist={todolist} />
      </h3>
      <AddItemForm
        addItem={addTaskCallBack}
        placeholder={"add new task"}
        disabled={todolist.entityStatus === "loading"}
      />
      <Tasks todolist={todolist} tasks={tasks} />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginRight: "3px",
        }}
      >
        <FilterTasksButtons todolist={todolist} />
      </div>
    </div>
  );
});
