"use client";
import { useState } from "react";
import React, { useEffect } from "react";

import {
  setTodos,
  selectTodos,
  selectStatus,
} from "@/lib/features/todos/todosSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import TodoHiveLogo from "@/app/components/TodoHiveLogo";
import Link from "next/link";
import TodoCard from "../components/TodoCard";

interface DashboardProps {}

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);
  const status = useAppSelector(selectStatus);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    console.log(savedTodos);
    if (savedTodos) {
      dispatch(setTodos(JSON.parse(savedTodos)));
    }
  }, [dispatch]);

  return (
    <main
      style={{
        backgroundImage:
          "url(/images/upper-hive-grad.png), url(/images/footer-hive-grad.png)",
        backgroundSize: "100px , 100px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left top, right bottom",
        position: "relative",
      }}
      className="flex min-h-screen flex-col items-center justify-center p-24"
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: 30,
          top: 30,
        }}
      >
        <span style={{ fontSize: 20, lineHeight: "1em" }}>
          Halo Effry, <br />
          <span style={{ fontSize: 12, color: "grey", fontWeight: 300 }}>
            Kamu ada tugas yang perlu dikerjakan
          </span>
        </span>
      </div>

      <button
        onClick={() => {
          console.log("Button Clicked");
          const data = todos;
          console.log(data[0]);
        }}
      >
        Button Text
      </button>

      <div style={{ display: "flex" }}>
        <div>
          <div style={{ textAlign: "left", marginBottom: 10, marginLeft: 10 }}>
            <span>Activity To Do</span>
          </div>
          <div
            style={{
              overflow: "auto",
              height: "300px",
            }}
          >
            {/* {data &&
              data.map((item: Todo) => (
                <TodoCard
                  key={item.id}
                  title={item.title}
                  completed={item.completed}
                />
              ))} */}
          </div>
        </div>
        <div style={{ margin: 20 }}></div>
        <div>
          <div style={{ textAlign: "left", marginBottom: 10, marginLeft: 10 }}>
            <span>Activity Completed</span>
          </div>
          <div
            style={{
              overflow: "auto",
              height: "300px",
            }}
          >
            {/* {data &&
              data.map((item: Todo) => (
                <TodoCard
                  key={item.id}
                  title={item.title}
                  completed={item.completed}
                />
              ))} */}
          </div>
        </div>
      </div>
    </main>
  );
}
