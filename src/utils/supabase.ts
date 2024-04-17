import { createClient } from "@supabase/supabase-js";
import { Database } from "../supabaseTypes.ts";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_APPKEY as string;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
