// "use client";

// import { useEffect } from "react";
// import { createFunding } from "@/services/funding";
// export default function SuccessPage() {

//   useEffect(() => {

//   const saveFunding =
//     async () => {

//       const fundingInfo =
//         JSON.parse(
//           localStorage.getItem(
//             "fundingInfo"
//           )
//         );

//       if (!fundingInfo)
//         return;

//       await createFunding({
//         ...fundingInfo,

//         transactionId:
//           crypto.randomUUID(),

//         fundingDate:
//           new Date(),
//       });

//       localStorage.removeItem(
//         "fundingInfo"
//       );
//     };

//   saveFunding();

// }, []);

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <h1 className="text-4xl font-bold text-green-600">
//         Payment Successful
//       </h1>
//     </div>
//   );
// }


"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { createFunding } from "@/services/funding";

export default function SuccessPage() {
  useEffect(() => {
    const saveFunding = async () => {
      const fundingInfo = JSON.parse(
        localStorage.getItem("fundingInfo")
      );

      if (!fundingInfo) return;

      await createFunding({
        ...fundingInfo,
        transactionId: crypto.randomUUID(),
        fundingDate: new Date(),
      });

      localStorage.removeItem("fundingInfo");
    };

    saveFunding();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-2xl">

        <CheckCircle
          size={100}
          className="mx-auto text-green-500 mb-6"
        />

        <h1 className="text-5xl font-bold text-green-600 mb-4">
          Payment Successful
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Thank you for your contribution.
          Your donation has been completed successfully.
        </p>

        <Link
          href="/funding"
          className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition"
        >
          Back to Funding
        </Link>

      </div>
    </div>
  );
}