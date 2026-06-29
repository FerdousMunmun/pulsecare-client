"use client";


import {
useState
} from "react";

import {
authClient
} from "@/lib/auth-client";

import {
donateRequest
} from "@/services/donationRequest";



export default function DonateButton({
      
requestId
}) {



const [open,setOpen]=
useState(false);



const handleDonate =
async()=>{
      


const session =
await authClient.getSession();
  

const result =
await donateRequest(
requestId,
{
donorName:
session.data.user.name,

donorEmail:
session.data.user.email,
}
);

 


if(result.modifiedCount>0){

alert(
"Donation Confirmed"
);

window.location.reload();

}

};



return (

<>

<button

onClick={()=>
setOpen(true)
}

className="bg-red-700 text-white px-10 py-4 rounded-2xl font-bold"
>

Donate Now

</button>



{open && (

<div className="fixed inset-0 bg-black/40 flex justify-center items-center">


<div className="bg-white p-8 rounded-3xl w-96">


<h2 className="text-2xl font-bold mb-5">

Confirm Donation

</h2>



<p>
Are you sure you want to donate?
</p>



<div className="flex gap-3 mt-6">


<button

onClick={()=>
setOpen(false)
}

className="bg-gray-200 px-5 py-2 rounded-xl"

>

Cancel

</button>



<button

onClick={handleDonate}

className="bg-red-700 text-white px-5 py-2 rounded-xl"

>

Confirm

</button>


</div>


</div>


</div>

)}



</>

);

}