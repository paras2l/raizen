import { createClient } from '@supabase/supabase-js';

// The Singularity OS requires persistent, high-availability memory clusters.
const supabaseUrl = 'https://clcyjlonejqtluadlwgm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsY3lqbG9uZWpxdGx1YWRsd2dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwOTE3NDUsImV4cCI6MjA4OTY2Nzc0NX0.47Bw4WxJpoGAO2slS9DxrYivHa63Ar9sBuh-WHtsrY0';

export const supabase = createClient(supabaseUrl, supabaseKey);
