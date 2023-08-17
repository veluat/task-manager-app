import React, { ChangeEvent, FC, memo } from "react";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import ListItem from "@mui/material/ListItem";
import { DeleteForeverOutlined } from "@mui/icons-material";
import s from "./task.module.css";
import {TaskType} from "../../../../../tasks/api/tasks.api.types";
import {useActions} from "../../../../../../../common/hooks";
import {tasksThunks} from "../../../../../tasks/model/tasks.slice";
import {TaskStatuses} from "../../../../../../../common/enums";
import {EditableSpan} from "../../../../../../../common/components";


type Props = {
  task: TaskType;
  todolistId: string;
};

export const Task: FC<Props> = memo(({ task, todolistId }) => {
  const { removeTask, updateTask } = useActions(tasksThunks);

  const removeTaskHandler = () => {
    removeTask({ taskId: task.id, todolistId });
  };

  const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    const status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New;
    updateTask({ taskId: task.id, domainModel: { status }, todolistId });
  };

  const changeTitleHandler = (title: string) => {
    updateTask({ taskId: task.id, domainModel: { title }, todolistId });
  };

  return (
    <ListItem
      key={task.id}
      style={{ padding: "0" }}
      className={task.status === TaskStatuses.Completed ? s.isDone : ""}
    >
      <Checkbox
        size="small"
        color="primary"
        checked={task.status === TaskStatuses.Completed}
        onChange={changeStatusHandler}
      />
      <EditableSpan title={task.title} changeTitle={changeTitleHandler} />
      <IconButton onClick={removeTaskHandler} size="small">
        <DeleteForeverOutlined />
      </IconButton>
    </ListItem>
  );
});
