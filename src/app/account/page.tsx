"use client";
import { useState } from "react";
import React, { useEffect } from "react";

import {
  getTodosData,
  selectTodos,
  selectStatus,
} from "@/lib/features/todos/todosSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import FooterText from "@/app/components/FooterText";
import TodoHiveLogo from "@/app/components/TodoHiveLogo";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);
  const status = useAppSelector(selectStatus);

  useEffect(() => {
    dispatch(getTodosData("_"));
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
        <TodoHiveLogo scaleTransform={0.5} />
      </div>
      <Link href={"/dashboard"}>
        <button>Next</button>
      </Link>
      <button
        onClick={() => {
          console.log("Button Clicked");
          const data = todos;
          console.log(data[0]);
        }}
      >
        Button Text
      </button>
      <FooterText />
    </main>
  );
}
