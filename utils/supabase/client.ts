import { createBrowserClient } from '@supabase/ssr';

/**
 * Método facilitado fornecido pela documentação do Supabase
 * permite a criação de um cliente no navegador
 * dando acesso aos componentes clientes a api do Supabase.
 * @returns
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
