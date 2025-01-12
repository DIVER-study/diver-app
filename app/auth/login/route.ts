// pages/api/auth.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // createClient: método para acessar o Supabase no servidor
    const supabase = await createClient();

    // Supabase auth.signInWithPassword: método de autenticação
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { error: 'Erro ao autenticar: ' + error.message },
        { status: 401 }
      );
    }

    if (!data.user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Usuário autenticado com sucesso!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return NextResponse.json({ error: 'Erro inesperado' }, { status: 500 });
  }
}
