import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eilhinmeynmwzeyreizt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpbGhpbm1leW5td3pleXJlaXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5MDY2NjcsImV4cCI6MjA5NzQ4MjY2N30.YjKu0Zlp4BVA6xTXmndbn4DyPGlb6AWzbJJR5lHFbN4'

export const supabase = createClient(supabaseUrl, supabaseKey)