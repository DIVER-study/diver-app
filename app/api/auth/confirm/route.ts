import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest } from 'next/server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

/**
 * @swagger
 * /api/auth/confirm:
 *  get:
 *    description: Rota utlizada para confirmação de ususário. Captura o token inserido no url, o tipo de otp e a página de redirecionamento
 *    response:
 *      200:
 *        description: Faz login do usuário e redireciona para a página de redirecionamento.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/';

  console.log(next)

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      // redirect user to specified redirect URL or root of app
      redirect(next);
    } else {
      console.log(error.message);
    }
  }

  // redirect the user to an error page with some instructions
  redirect('/error');
}

