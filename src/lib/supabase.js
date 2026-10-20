import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jvckxwyvrwmxhikttfvz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2Y2t4d3l2cndteGhpa3R0ZnZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI0ODU3ODMsImV4cCI6MjEwODA2MTc4M30.33rupcxWpjNCOLLCVtvZgL1X5iBSpljBwT5rngpA5k4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
