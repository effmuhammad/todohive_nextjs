"use client";
import { useState } from "react";
import React, { useEffect } from "react";
import UserCard from "@/app/components/UserCard";

import {
  getTodosData,
  setTodos,
  selectTodos,
  selectStatus,
} from "@/lib/features/todos/todosSlice";
import {
  setSessionUser,
  selectSessionUserId,
} from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import FooterText from "@/app/components/FooterText";
import TodoHiveLogo from "@/app/components/TodoHiveLogo";
import Link from "next/link";

export default function Account() {
  const dispatch = useAppDispatch();
  const sessionUserId = useAppSelector(selectSessionUserId);
  const todos = useAppSelector(selectTodos);

  const users = Array.from(new Set(todos.map((todo) => todo.userId)));

  useEffect(() => {
    dispatch(setSessionUser(0));
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos === null) {
      dispatch(getTodosData("_"));
    } else {
      dispatch(setTodos(JSON.parse(savedTodos)));
    }
  }, [dispatch]);

  return (
    <main
      style={{
        backgroundImage:
          "url(/images/upper-hive.png), url(/images/footer-hive.png), url(/images/grad-bg.jpg)",
        backgroundSize: "200px , 200px, cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left top, right bottom, center",
        position: "relative",
      }}
      className="flex min-h-screen flex-col items-center justify-center p-5"
    >
      <div className="flex absolute top-8 left-8">
        <TodoHiveLogo scaleTransform={0.5} />
      </div>
      <div className="grid grid-cols-4 gap-4 overflow-auto p-5">
        {users.map((user) => (
          <Link href={"/dashboard"}>
            <button
              onClick={() => {
                console.log("User selected: ", user);
                dispatch(setSessionUser(user));
              }}
            >
              <UserCard userId={user} />
            </button>
          </Link>
        ))}
      </div>
      <FooterText />
    </main>
  );
}
