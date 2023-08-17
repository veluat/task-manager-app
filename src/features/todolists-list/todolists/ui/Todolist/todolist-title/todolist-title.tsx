import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import React, { FC, useCallback } from "react";
import {TodolistDomainType, todolistsThunks} from "../../../model/todolists.slice";
import {useActions} from "../../../../../../common/hooks";
import {EditableSpan} from "../../../../../../common/components";

type Props = {
  todolist: TodolistDomainType;
};

export const TodolistTitle: FC<Props> = ({ todolist }) => {
  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);

  const removeTodolistHandler = () => {
    removeTodolist(todolist.id);
  };

  const changeTodolistTitleCallback = useCallback(
    (title: string) => {
      changeTodolistTitle({ id: todolist.id, title });
    },
    [todolist.id]
  );

  return (
    <h3>
      <EditableSpan
        title={todolist.title}
        changeTitle={changeTodolistTitleCallback}
      />
      <IconButton
        onClick={removeTodolistHandler}
        disabled={todolist.entityStatus === "loading"}
        size="small"
      >
        <Delete />
      </IconButton>
    </h3>
  );
};
