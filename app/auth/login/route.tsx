import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    //supabase.auth.signInWithPassword: método da API do Supabase que tenta autenticar o usuário usando o e-mail e a senha fornecidos.
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: 'Erro ao autenticar: ' + error.message }, { status: 401 });
    }

    // Verifica se o usuário foi encontrado
    if (!data.user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    // Retorna sucesso se o usuário for encontrado
    return NextResponse.json({ message: 'Usuário autenticado com sucesso!' }, { status: 200 });

  } catch (error) {
    console.error('Erro na autenticação:', error);
    return NextResponse.json({ error: 'Erro inesperado' }, { status: 500 });
  }
}
