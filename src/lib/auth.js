import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";







const client = new MongoClient(process.env.MONGO_DB_URI);

await client.connect();
const db = client.db("pulsecare_db");
export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),


    emailAndPassword: { 
    enabled: true, 
  },
    
  user:{
    additionalFields:{
      role:{
          type: "string",
        defaultValue: "donor" //Doner,volunteer,admin
      },
      
      status: {
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
 session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 60 * 24 * 30,
    },
  },

  plugins: [jwt()],
  
});