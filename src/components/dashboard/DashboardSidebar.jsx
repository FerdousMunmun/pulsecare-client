



import { auth } from "@/lib/auth";
import {Bars,  House, } from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import { headers } from "next/headers";
import Link from "next/link";
import { LuHeartPulse } from "react-icons/lu";

export default async function DashboardSidebar() {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  const user = session?.user
const role = (user?.role || "donor").toLowerCase();

 // console.log(user)

const dashboardItems = {
  donor: [
     {icon: House, label: "Dashboard", link: '/dashboard/donor'},
     {icon: House, label: "My Profile", link:'/dashboard/donor/profile'},
     {icon: House, label: "My Donation Requests", link:'/dashboard/donor/my-donation-request'},
     {icon: House, label: "Create Donation Request", link:'/dashboard/donor/create-donation-request'},
  ],
  volunteer: [
     {icon: House, label: "Dashboard", link: '/dashboard/volunteer'},
     {icon: House, label: "My Profile", link:'/dashboard/volunteer/profile'},
     {icon: House, label: "My Donation Requests", link:'/dashboard/volunteer/my-donation-request'},
     {icon: House, label: "Create Donation Request", link:'/dashboard/volunteer/create-donation-request'},
     {icon: House, label: "All Blood Donation Request", link:'/dashboard/volunteer/all-blood-donation-request'},
  ],
  admin: [
     {icon: House, label: "Dashboard", link: '/dashboard/admin'},
     {icon: House, label: "My Profile", link:'/dashboard/admin/profile'},
     {icon: House, label: "My Donation Requests", link:'/dashboard/admin/my-donation-request'},
     {icon: House, label: "Create Donation Request", link:'/dashboard/admin/create-donation-request'},
     {icon: House, label: "All Blood Donation Request", link:'/dashboard/admin/all-blood-donation-request'},
     {icon: House, label: "All Users Page", link:'/dashboard/admin/all-users'},
  ],
}
const navItems = dashboardItems[user?.role?.toLowerCase() || "donor"] || [];

console.log (navItems)


  return (
    <Drawer>
      <Button className={'hidden'} variant="secondary">
        <Bars />
        Menu
      </Button>

      <nav className="flex flex-col gap-1 w-[250px] border border-right-1 ">


         <div className="flex flex-col mb-4">
    
    <p className="font-bold text-red-600 capitalize">
      {role}
    </p>
  </div>
        <div className="flex gap-2  items-center">
          <LuHeartPulse className=" text-3xl text-red-800 pt-1"/>
                <p className="text-2xl font-bold text-yellow-500">Pulse
                    <span className="text-3xl font-bold text-red-800">Care</span>
                </p>
        </div>
        {navItems.map((item) => (
                  <button
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    type="button"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </button>
                ))}
              </nav>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
               <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link key={item.label} href={item.link}>
                    <button
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                      type="button"
                    >
                      <item.icon className="size-5 text-muted" />
                      {item.label}
                    </button>
                  </Link>
                ))}
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}