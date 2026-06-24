import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";







const client = new MongoClient(process.env.MONGO_DB_URI);

await client.connect();
const db = client.db("pulsecare_db");
export const auth = betterAuth({


    emailAndPassword: { 
    enabled: true, 
  },
  user:{
    additionalFields:{
      role:{
          type: "string",
        defaultValue: "donor" //Doner,volunteer,admin
      },
      plan:{
          type: "string",
        defaultValue: 'free' //free,pro
      },status: {
  type: "string",
  defaultValue: "active",
},
bloodGroup: {
  type: "string",
},
district: {
  type: "string",
},
upazila: {
  type: "string",
},
image: {
  type: "string",
},

    }
  } ,
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
});