import { ConfirmAnswerIcon } from '@/components/svgs/Svgs';

type ConfirmButtonProps = {
  handleConfirm: () => void;
  selectedAnswer: number;
};

export const ConfirmButton = ({ handleConfirm, selectedAnswer }: ConfirmButtonProps) => {
  return (
    <div className='flex mt-4'>
      <button
        onClick={handleConfirm}
        disabled={selectedAnswer === -1} // Correção: verifica corretamente se a resposta foi selecionada
        className='px-8 py-[12px] bg-white-500 text-white rounded-md disabled:bg-white-300 border-2 border-black shadow-[4px_4px_4px_rgba(0,0,0,0.6)] hover:shadow-[6px_6px_6px_rgba(0,0,0,0.7)]'
      >
        <ConfirmAnswerIcon width={26} height={20} />
      </button>
    </div>
  );
};
