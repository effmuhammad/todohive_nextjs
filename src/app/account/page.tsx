import FooterText from "@/components/FooterText";
import TodoHiveLogo from "@/components/TodoHiveLogo";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        backgroundImage:
          "url(/images/upper-hive.png), url(/images/footer-hive.png), url(/images/grad-bg.jpg)",
        backgroundSize: "20%, 20%, cover",
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
      <FooterText />
    </main>
  );
}
