import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://inaqybyfmfgixgowrqnp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluYXF5YnlmbWZnaXhnb3dycW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc2MzA0OTAsImV4cCI6MjAyMzIwNjQ5MH0.-mU9CfGe1ukp7Q69WhSfzRHuvNFLF_QiKZk7colE3M4";
const supabase = createClient(supabaseUrl, supabaseKey);

// export const supabase2 = createClient(supabaseUrl, supabaseKey, {
//   auth: {
//     storageKey: "s1",
//   },
// });

export default supabase;
