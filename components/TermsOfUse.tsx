'use client';
import { CloseIcon } from '@/components/svgs';

export function TermsOfUse({
  action,
}: React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement> & { action: () => void }) {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-opacity-50 z-50'>
      <div className='bg-beige-100 p-6 rounded-lg shadow-lg w-[80%] h-[80%] relative px-[5%] flex flex-col'>
        {/* Botão de Fechar */}
        <button
          onClick={action}
          className='absolute top-4 right-8 cursor-pointer'
        >
          <CloseIcon
            width={20}
            height={20}
          />
        </button>

        {/* Conteúdo rolável */}
        <div
          className='overflow-y-auto flex-grow pr-4'
          style={{ maxHeight: '90%' }}
        >
          <h1 className='text-3xl mt-15 font-bold mb-10'>Termos e Condições de Uso - CogTec</h1>

          <p className='text-base font-medium'>
            Bem-vindo(a) ao CogTec, sua plataforma interativa de aprendizado da cadeira de Cognição e suas tecnologias
            digitais com um toque de cultura pop! Antes de embarcar nesta jornada educacional emocionante, é essencial
            entender e concordar com os Termos e Condições que regem a utilização dos nossos serviços.
          </p>
          <br />

          <p className='text-base font-medium'>
            Ao acessar e utilizar o CogTec, você concorda em cumprir e estar vinculado aos seguintes termos e condições.
            A nossa missão é proporcionar uma experiência educacional inovadora e envolvente, e esses termos visam
            garantir a segurança, a integridade e o respeito em nossa comunidade de aprendizes de programação.
          </p>
          <br />

          <p className='text-base font-medium'>
            Por favor, leia atentamente os Termos e Condições a seguir. Se tiver alguma dúvida ou preocupação, não
            hesite em entrar em contato conosco (email de alguém). Ao continuar a utilizar o CogTec, você reconhece que
            compreendeu e concorda com os termos estabelecidos.
          </p>
          <br />

          <ol>
            <li className='text-base font-bold'>1. Aceitação dos Termos:</li>
            <p className='text-base font-medium'>
                 Ao acessar e utilizar o CogTec, você automaticamente concorda com estes Termos e Condições. Se não
              concordar com algum aspecto destes termos, pedimos que não utilize nossos serviços.
            </p>
            <li className='text-base font-bold'>2. Uso Responsável:</li>
            <p className='text-base font-medium'>
                 Compromete-se a utilizar o CogTec de maneira responsável, respeitando outros usuários e cumprindo todas
              as leis e regulamentos aplicáveis.
            </p>
            <li className='text-base font-bold'>3. Conta do Usuário:</li>
            <p className='text-base font-medium'>
                 Ao criar uma conta no CogTec, somos responsáveis por manter a confidencialidade de suas credenciais e
              informações de sua conta.
            </p>
            <li className='text-base font-bold'>4. Propriedade Intelectual:</li>
            <p className='text-base font-medium'>
                 Reconhecemos que todos os direitos autorais, marcas registradas e outros direitos de propriedade
              intelectual relacionados às franquias referenciadas em nossa plataforma são de propriedade intelectual
              exclusivas das respectivas empresas detentoras. Reiteramos que a plataforma não possui fins lucrativos,
              apenas educacionais, portanto não há ganhos derivados da utilização de propriedade intelectual de outrem.
              Buscamos utilizar as personagens de maneira respeitosa e meramente ilustrativa.
            </p>
            <li className='text-base font-bold'>5. Privacidade e Dados Pessoais:</li>
            <p className='text-base font-medium'>
                 Entende e concorda com a nossa Política de Privacidade, que descreve como coletamos, usamos e
              protegemos suas informações pessoais.
            </p>
            <li className='text-base font-bold'>6. Alterações nos Termos:</li>
            <p className='text-base font-medium'>
                 Reconhece que os Termos e Condições podem ser atualizados periodicamente, e concorda em revisá-los
              regularmente.
            </p>
            <li className='text-base font-bold'>7. Encerramento da Conta:</li>
            <p className='text-base font-medium'>
                 Reservamo-nos o direito de encerrar ou suspender sua conta, a nosso critério, caso haja violação destes
              Termos e Condições.
            </p>
          </ol>
          <br />
          <p className='text-base font-medium'>
            Agradecemos por utilizar o CogTec como sua plataforma de aprendizado. Estamos empolgados em tê-lo(a) conosco
            nessa jornada educacional única. Se precisar de esclarecimentos adicionais ou tiver alguma preocupação,
            entre em contato conosco.
          </p>
          <br />
          <p>Seja bem-vindo(a) ao CogTec!</p>
        </div>
      </div>
    </div>
  );
}
