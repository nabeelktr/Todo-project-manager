import AuthPage from "@/components/Auth/AuthPage";

export default function Home() {
  return (
    <main
      className="lg:px-[12%] pt-16 h-screen "
      style={{
        background: "linear-gradient(to bottom, #FFFFFF, #AFA3FF)",
      }}
    >
     <AuthPage />
    </main>
  );
}
