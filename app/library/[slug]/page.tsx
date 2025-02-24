import { SideBar } from '@/components/SideBar';
import { UserStore } from '@/components/UserStore';
import { getLibraryBlog } from './server';
import Markdown from 'react-markdown';
import Link from 'next/link';
import rehypeRaw from 'rehype-raw';

const LibraryBlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const {
    data: { markdown, title, category },
    error,
  } = await getLibraryBlog(slug);
  if (error) console.error(`Erro ao procurar conteúdo. ${error.message}`);

  return (
    <div className='flex h-screen'>
      <UserStore />
      <SideBar activeTab='biblioteca' />
      <main className='flex-1 max-h-full py-8 px-14 overflow-y-auto overscroll-y-contain space-y-8'>
        <div className='bg-beige-50 rounded-3xl h-fit w-fit max-w-full p-4 shadow-cogtec text-logo-200 uppercase mx-auto'>
          <Link href='/library'>{category}</Link> &gt; {title}
        </div>
        <div className='prose bg-beige-50 rounded-3xl p-8 mx-auto'>
          <Markdown rehypePlugins={[rehypeRaw]}>{markdown}</Markdown>
        </div>
      </main>
    </div>
  );
};

export default LibraryBlogPage;
