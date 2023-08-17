import { Button } from "@mui/material";

import React, { FC } from "react";
import {FilterValuesType, TodolistDomainType, todolistsActions} from "../../../model/todolists.slice";
import {useActions} from "../../../../../../common/hooks";

type Props = {
  todolist: TodolistDomainType;
};

export const FilterTasksButtons: FC<Props> = ({ todolist }) => {
  const { changeTodolistFilter } = useActions(todolistsActions);

  const changeTasksFilterHandler = (filter: FilterValuesType) => {
    changeTodolistFilter({ id: todolist.id, filter });
  };

  return (
    <>
      <Button
        style={{ marginRight: "3px" }}
        variant={"contained"}
        onClick={() => changeTasksFilterHandler("all")}
        color={todolist.filter === "all" ? "primary" : "secondary"}
        size="small"
        disableElevation
      >
        All
      </Button>
      <Button
        style={{ marginRight: "3px" }}
        variant={"contained"}
        onClick={() => changeTasksFilterHandler("active")}
        color={todolist.filter === "active" ? "primary" : "secondary"}
        size="small"
        disableElevation
      >
        Active
      </Button>
      <Button
        style={{ marginRight: "3px" }}
        color={todolist.filter === "completed" ? "primary" : "secondary"}
        variant={"contained"}
        onClick={() => changeTasksFilterHandler("completed")}
        size="small"
        disableElevation
      >
        Completed
      </Button>
    </>
  );
};
