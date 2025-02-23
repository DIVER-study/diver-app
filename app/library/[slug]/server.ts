'use server';

import { createClient } from '@/utils/supabase/server';

export const getLibraryBlog = async (slug: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('library_blogs')
    .select('markdown, title, category')
    .eq('slug', slug)
    .limit(1)
    .single();
  if (error) console.error(error.message);
  return { data: data || { markdown: '', title: '404', category: '404' }, error: error || null };
};
