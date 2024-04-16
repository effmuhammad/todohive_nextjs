"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Modal from "react-modal";

import {
  setTodos,
  selectTodos,
  selectStatus,
  Todo,
  createTodo,
  updateTodo,
  deleteTodo,
} from "@/lib/features/todos/todosSlice";
import {
  setSessionUser,
  selectSessionUserId,
} from "@/lib/features/user/userSlice";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import TodoCard from "../components/TodoCard";

interface DashboardProps {}

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const sessionUserId = useAppSelector(selectSessionUserId);
  const todos = useAppSelector(selectTodos);
  const status = useAppSelector(selectStatus);

  const [logoutVisible, setLogoutVisible] = useState(false);

  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTodoTitle, setEditTodoTitle] = useState("");
  const [editTodoId, setEditTodoId] = useState(0);

  const handleNewTodoTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewTodoTitle(event.target.value);
  };

  const handleNewTodoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newTodoTitle.trim() === "") {
      alert("Todo title cannot be empty");
      return;
    }
    // Dispatch an action to add a new todo
    dispatch(
      createTodo({
        id: todos.length + 1, // Generate a new id
        userId: sessionUserId,
        title: newTodoTitle,
        completed: false,
      })
    );
    dispatch(
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          userId: sessionUserId,
          title: newTodoTitle,
          completed: false,
        },
      ])
    );
    // Clear the input field
    setNewTodoTitle("");
    // Close the modal
    closeModal();
  };

  const handleEditTodoTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditTodoTitle(event.target.value);
  };

  const handleEditTodoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editTodoTitle.trim() === "") {
      alert("Todo title cannot be empty");
      return;
    }
    // Dispatch an action to edit the todo
    dispatch(
      updateTodo({
        userId: sessionUserId,
        id: editTodoId,
        title: editTodoTitle,
        completed: false,
      })
    );
    dispatch(
      setTodos(
        todos.map((todo) =>
          todo.id === editTodoId ? { ...todo, title: editTodoTitle } : todo
        )
      )
    );
    // Clear the input field
    setEditTodoTitle("");
    // Close the modal
    closeModal();
  };

  const openEditModal = (todo: Todo) => {
    setEditTodoTitle(todo.title);
    setIsEditModalOpen(true);
  };

  // Remove the unused function

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    const savedUserId = localStorage.getItem("userId");
    const savedTodos = localStorage.getItem("todos");

    if (savedUserId && savedTodos) {
      dispatch(setSessionUser(JSON.parse(savedUserId)));
      dispatch(setTodos(JSON.parse(savedTodos)));
    } else {
      router.push("/");
    }
  }, [dispatch, router]);

  return (
    <main
      style={{
        backgroundImage:
          "url(/images/upper-hive-grad.png), url(/images/footer-hive-grad.png)",
        backgroundSize: "120px , 120px",
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
        <span style={{ fontSize: 24, lineHeight: "1.2em" }}>
          Hello User {sessionUserId}, <br />
          <span style={{ fontSize: 15, color: "grey", fontWeight: 300 }}>
            You have activities to do.
          </span>
        </span>
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: 30,
          top: 30,
          alignItems: "center",
        }}
      >
        <button
          style={{
            height: 60,
            width: 220,
            borderRadius: 20,
            backgroundColor: "#9747FF",
            color: "white",
            fontWeight: 400,
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <img src="/icons/plus-icon.png" alt="" className="w-8" />
          <div style={{ width: 15 }}></div>
          Make a New Todo
        </button>
        <div style={{ width: 30 }}></div>
        <div>
          <button>
            <img
              src={`/profile-photos/${sessionUserId}.png`}
              alt={`User ${sessionUserId}`}
              className="w-20 h-20 rounded-full"
              onClick={() => setLogoutVisible(!logoutVisible)}
            />
            {logoutVisible && (
              <button
                style={{
                  margin: 20,
                  display: "flex",
                  position: "absolute",
                  right: 10,
                  backgroundColor: "red",
                  color: "white",
                  fontWeight: 400,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  height: 30,
                  width: 100,
                }}
                onClick={() => {
                  router.push("/");
                }}
              >
                Logout
              </button>
            )}
          </button>
        </div>
      </div>

      {/* <div className="m-3"></div> */}

      <div className="flex" style={{ height: 700 }}>
        <div className="p-6 rounded-3xl items-center justify-left border-2 border-grey overflow-auto">
          <div
            style={{
              textAlign: "left",
              marginBottom: 10,
              marginLeft: 10,
              fontWeight: 600,
              fontSize: 18,
              width: 350,
            }}
          >
            <span>Activity To Do</span>
          </div>
          <div>
            {todos.map((item: Todo) => {
              if (item.userId === sessionUserId && !item.completed) {
                return (
                  <TodoCard
                    key={item.id}
                    title={item.title}
                    completed={item.completed}
                    onToggleCompleted={() => {
                      console.log("Toggle", item.id, "completed");
                      // change state in todos
                      const newTodos = todos.map((todo) => {
                        if (todo.id === item.id) {
                          dispatch(updateTodo(todo));
                          return { ...todo, completed: !todo.completed };
                        }
                        return todo;
                      });
                      dispatch(setTodos(newTodos));
                    }}
                    onEdit={() => {
                      // edit todo
                      console.log("Edit", item.id);
                      setEditTodoTitle(item.title);
                      setEditTodoId(item.id);
                      openEditModal(item);
                    }}
                    onDelete={() => {
                      // delete todo
                      console.log("Delete", item.id);
                      const newTodos = todos.filter(
                        (todo) => todo.id !== item.id
                      );
                      dispatch(setTodos(newTodos));
                      dispatch(deleteTodo(item.id));
                    }}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
        <div style={{ margin: 20 }}></div>
        <div className="p-6 rounded-3xl  items-center justify-left border-2 border-grey overflow-auto">
          <div
            style={{
              textAlign: "left",
              marginBottom: 10,
              marginLeft: 10,
              fontWeight: 600,
              fontSize: 18,
              width: 350,
            }}
          >
            <span>Activity Completed</span>
          </div>
          <div className="overflow-auto">
            {todos.map((item: Todo) => {
              if (item.userId === sessionUserId && item.completed) {
                return (
                  <TodoCard
                    key={item.id}
                    title={item.title}
                    completed={item.completed}
                    onToggleCompleted={() => {
                      console.log("Toggle", item.id, "not completed");
                      const newTodos = todos.map((todo) => {
                        if (todo.id === item.id) {
                          dispatch(updateTodo(todo));
                          return { ...todo, completed: !todo.completed };
                        }
                        return todo;
                      });
                      dispatch(setTodos(newTodos));
                    }}
                    onEdit={() => {
                      console.log("Edit", item.id);
                      setEditTodoTitle(item.title);
                      setEditTodoId(item.id);
                      openEditModal(item);
                    }}
                    onDelete={() => {
                      console.log("Delete", item.id);
                      const newTodos = todos.filter(
                        (todo) => todo.id !== item.id
                      );
                      dispatch(setTodos(newTodos));
                      dispatch(deleteTodo(item.id));
                    }}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="add todo modal"
        ariaHideApp={false}
        style={{
          content: {
            width: 300,
            height: 250,
            margin: "auto",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
          },
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 20,
            fontWeight: 600,
            fontSize: 20,
          }}
        >
          Add New Activity Todo
        </h2>
        <div style={{ height: 10 }}></div>
        <form onSubmit={handleNewTodoSubmit}>
          <input
            style={{
              height: 50,
              width: 250,
              borderRadius: 10,
              padding: 10,
              fontSize: 16,
              border: "1px solid grey",
              marginBottom: 20,
            }}
            type="text"
            value={newTodoTitle}
            onChange={handleNewTodoTitleChange}
            placeholder="Enter new todo"
          />
          <button
            style={{
              height: 50,
              width: 100,
              backgroundColor: "green",
              color: "white",
              borderRadius: 10,
              marginTop: 10,
              position: "absolute",
              left: 20,
              bottom: 20,
            }}
            type="submit"
          >
            Add Todo
          </button>
        </form>

        <button
          style={{
            height: 50,
            width: 100,
            backgroundColor: "red",
            color: "white",
            borderRadius: 10,
            marginTop: 10,
            position: "absolute",
            right: 20,
            bottom: 20,
          }}
          onClick={closeModal}
        >
          Close
        </button>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeModal}
        contentLabel="add todo modal"
        ariaHideApp={false}
        style={{
          content: {
            width: 300,
            height: 250,
            margin: "auto",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
          },
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 20,
            fontWeight: 600,
            fontSize: 20,
          }}
        >
          Edit Activity Todo
        </h2>
        <div style={{ height: 10 }}></div>
        <form onSubmit={handleEditTodoSubmit}>
          <input
            style={{
              height: 50,
              width: 250,
              borderRadius: 10,
              padding: 10,
              fontSize: 16,
              border: "1px solid grey",
              marginBottom: 20,
            }}
            type="text"
            value={editTodoTitle}
            onChange={handleEditTodoTitleChange}
            placeholder="Enter todo"
          />
          <button
            style={{
              height: 50,
              width: 100,
              backgroundColor: "green",
              color: "white",
              borderRadius: 10,
              marginTop: 10,
              position: "absolute",
              left: 20,
              bottom: 20,
            }}
            type="submit"
          >
            Edit Todo
          </button>
        </form>

        <button
          style={{
            height: 50,
            width: 100,
            backgroundColor: "red",
            color: "white",
            borderRadius: 10,
            marginTop: 10,
            position: "absolute",
            right: 20,
            bottom: 20,
          }}
          onClick={closeModal}
        >
          Close
        </button>
      </Modal>
    </main>
  );
}
