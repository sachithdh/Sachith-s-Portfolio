import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl) {
    throw new Error(
        'VITE_SUPABASE_URL is not set in import.meta.env. Please configure your Supabase URL.'
    );
}
if (!supabaseKey) {
    throw new Error(
        'VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY is not set in import.meta.env. Please configure your Supabase key.'
    );
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
