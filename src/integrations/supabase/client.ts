import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const SUPABASE_URL = 'https://xrrprdqnfnybvveonjpx.supabase.co'
const SUPABASE_PUBLISHABLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhycnByZHFuZm55YnZ2ZW9uanB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMzQ1ODMsImV4cCI6MjA2NDcxMDU4M30.M2nOPp67bmJZNPjMn_M9gSHXPRHc_LIi5GMM6FsRBso'

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
)
