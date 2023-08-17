import React, { useCallback, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {selectTodolists} from "./todolists/model/todolists.selectors";
import {selectTasks} from "./tasks/model/tasks.selectors";
import {selectIsLoggedIn} from "../auth/model/auth.selectors";
import {useActions} from "../../common/hooks";
import {todolistsThunks} from "./todolists/model/todolists.slice";
import {AddItemForm} from "../../common/components";
import {Todolist} from "./todolists/todolist";

export const TodolistsList = () => {
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { addTodolist, fetchTodolists } = useActions(todolistsThunks);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    fetchTodolists();
  }, []);

  const addTodolistCallback = useCallback((title: string) => {
    return addTodolist(title).unwrap();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Container fixed style={{ paddingTop: "20px" }}>
        <Grid container style={{ padding: "0 0 20px 0" }}>
          <AddItemForm
            addItem={addTodolistCallback}
            placeholder={"add new todoList"}
          />
        </Grid>
        <Grid container spacing={3}>
          {todolists.length ? (
            todolists.map((tl: any) => {
              let allTodolistTasks = tasks[tl.id];
              return (
                <Grid item key={tl.id}>
                  <Paper elevation={8} style={{ padding: "20px" }}>
                    <Todolist todolist={tl} tasks={allTodolistTasks} />
                  </Paper>
                </Grid>
              );
            })
          ) : (
            <span style={{ padding: "20px" }}>Create your first todoList!</span>
          )}
        </Grid>
      </Container>
    </>
  );
};
