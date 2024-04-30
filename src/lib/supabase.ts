import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL =
  process.env.REACT_APP_SUPABASE_URL ??
  'https://aqzlopmqkgbyirlkfuzc.supabase.co';

export const SUPABASE_ANON_KEY =
  process.env.REACT_APP_SUPABASE_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxemxvcG1xa2dieWlybGtmdXpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3MDI2OTgsImV4cCI6MjAyNjI3ODY5OH0.6SB9NnUvqBOmbAoDwwTvcsKhh-1BRk_ClwhiqIjyEv8';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL as string,

  process.env.REACT_APP_SUPABASE_KEY as string
);

export default supabase;
