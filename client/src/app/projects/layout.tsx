import SideBar from "@/components/Layout/SideBar";
import { ProjectProvider } from "@/contexts/ProjectContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-5">
      <ProjectProvider>
        <div className="col-span-1 border-[#DEDEDE] border-r-2">
          <SideBar />
        </div>
        <div className="col-span-4 bg-[#F7F7F7]">{children}</div>
      </ProjectProvider>
    </div>
  );
}
