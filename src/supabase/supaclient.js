import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://smdxfapgnxyojzxktwug.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtZHhmYXBnbnh5b2p6eGt0d3VnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4NDk0MDQsImV4cCI6MjA0MTQyNTQwNH0.JnYJUaHaaih2T2s_MqSklvqc7s1loX7Ok4gm_9riZdI'
export const supabase = createClient(supabaseUrl, supabaseKey)
