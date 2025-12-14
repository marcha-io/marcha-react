import { supabase } from '../lib/supabase';

const fetchFromStorage = async (url: string, storage_name: string) => {
  const { data: blob, error } = await supabase.storage
    .from(storage_name)
    .download(url);

  if (error != null) {
    console.log(error);
    return null;
  }

  return blob;
};

export default fetchFromStorage;
