import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";







const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db("pulsecare_db");
export const auth = betterAuth({


    emailAndPassword: { 
    enabled: true, 
  },
  user:{
    additionalFields:{
      role:{
        defaultValue: "Donor" //Doner,volunteer,admin
      },
      plan:{
        defaultValue: 'Free' //free,pro
      }

    }
  } ,
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
});