import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let storageClient: SupabaseClient | null = null;

export const getSupabaseStorageClient = (): SupabaseClient => {
  if (storageClient) {
    return storageClient;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      "Missing Supabase environment variables: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for file uploads.",
    );
  }

  storageClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return storageClient;
};
