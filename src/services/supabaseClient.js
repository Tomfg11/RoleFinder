import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ndbiaoifafonxbjxstez.supabase.co'
const supabaseAnonKey = 'sb_publishable_dW8CZw9-h8RkD7q74_jn5w_YAwtRdKz'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)