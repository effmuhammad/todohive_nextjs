import FooterText from "@/components/FooterText";
import TodoHiveLogo from "@/components/TodoHiveLogo";
import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        backgroundImage:
          "url(/images/line-top.png), url(/images/line-bottom.png), url(/images/grad-bg.jpg)",
        backgroundSize: "contain, contain, cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left top, right bottom, center",
        position: "relative",
      }}
      className="flex min-h-screen flex-col items-center justify-center p-24"
    >
      <TodoHiveLogo />
      <span
        style={{ fontStyle: "italic", fontWeight: 300, marginBottom: "10px" }}
      >
        Innovative, user-friendly, and easy.
      </span>
      <Link href="/account">
        <button
          className="group transition-shadow hover:shadow-lg hover:scale-105 duration-300 ease-in-out transform motion-reduce:transform-none"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.25)",
            width: "160px",
            height: "60px",
            borderRadius: "15px",
          }}
        >
          Get started{"  "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </button>
      </Link>
      <FooterText />
    </main>
  );
}
