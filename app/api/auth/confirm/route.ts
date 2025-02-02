import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest } from 'next/server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

/**
 * @swagger
 * /api/auth/confirm:
 *  summary: Confirma usuário apartir de um token
 *  get:
 *    description: Rota utlizada para confirmação de ususário. Captura o token inserido no url, o tipo de otp e a página de redirecionamento
 *    parameters:
 *      - in: query
 *        name: token_hash
 *        schema:
 *          type: string
 *          required: true
 *          description: Token de uso único para autenticar o usuário
 *      - in: query
 *        name: type
 *        schema:
 *          type: string
 *          required: true
 *          enum: [email , signup , invite , magiclink , recovery , email_change]
 *          description: Tipo de autenticação
 *      - in: query
 *        name: next
 *        schema:
 *          type: string
 *          required: false
 *          default: '/'
 *          description: Site para redirecionar o usuário
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/';

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
      return Response.json({ error });
    }
  }

  // redirect the user to an error page with some instructions
  redirect('/error');
}
