import TodoHiveLogo from "@/app/components/TodoHiveLogo";
import Link from "next/link";
import React from "react";

interface DashboardProps {}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function getData(): Promise<Todo[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Dashboard: React.FC<DashboardProps> = async () => {
  const data = await getData();
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
      {data &&
        data.map((item: Todo, index: number) => (
          <div key={index}>
            {item.userId}
            <br />
            {item.title}
          </div>
        ))}
    </main>
  );
};

export default Dashboard;
