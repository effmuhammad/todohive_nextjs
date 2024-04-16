import React from "react";
import Image from "next/image";
import styles from "./TodoCard.module.css";

interface TodoCardProps {
  title: string;
  completed: boolean;
  onToggleCompleted: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const TodoCard: React.FC<TodoCardProps> = ({
  title,
  completed,
  onToggleCompleted,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className={`p-5 rounded-xl flex items-center justify-left border-2 ${
        completed ? "border-green-200 bg-green-50" : "border-gray-200 bg-white"
      }`}
      style={{
        margin: 5,
        width: 350,
        height: 80,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {!completed && (
        <button
          title="Mark Todo Activity as Completed"
          className={styles.radioButtonNotCompleted}
          onClick={onToggleCompleted}
        ></button>
      )}

      {completed && (
        <button
          title="Mark Todo Activity as Not Completed"
          className={styles.radioButtonCompleted}
          onClick={onToggleCompleted}
        >
          <img src="/icons/ok-icon.png" alt="" />
        </button>
      )}

      <div
        style={{
          width: 200,
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
          overflow: "hidden",
          textOverflow: "ellipsis",
          marginLeft: 15,
          marginRight: 15,
        }}
      >
        {title}
      </div>
      {/* </label> */}
      <div>
        <button
          style={{ marginRight: "20px" }}
          title="Edit Todo Activity"
          onClick={onEdit}
        >
          <Image src="icons/edit.svg" alt="edit todo" width="15" height="15" />
        </button>
        <button title="Delete Todo Activity" onClick={onDelete}>
          <Image
            src="icons/trash.svg"
            alt="delete todo"
            width="15"
            height="15"
          />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
