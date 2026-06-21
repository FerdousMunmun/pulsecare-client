import DashboardSidebar from "@/components/dashboard/DashboardSidebar";





export default function DashboardLayout({ children}) {
  return (
    <div className="flex h-screen bg-background ">
      <div  className="flex flex-1 overflow-hidden mt-4">
        {/* sidebar */}
        <DashboardSidebar/>
        <div className="flex-1 overflow-y-auto">
           
          {/* navbar */}
           <div className="  mt-4 w-full font-bold text-red-800">Dashboard</div>
          <main className="p-5">
           {children}</main>
        </div>
      </div>
    </div>
  );
}


