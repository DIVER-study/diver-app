'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [code, setCode] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeFromUrl = urlParams.get('code');
    if (codeFromUrl) {
      setCode(codeFromUrl);
    } else {
      setMessage('Código de redefinição de senha não encontrado.');
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('As senhas não coincidem.');
      return;
    }

    setLoading(true);

    if (!code) {
      setMessage('Código de redefinição de senha inválido.');
      setLoading(false);
      return;
    }

    try {
      // Redefine a senha usando o código
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setMessage(`Erro: ${error.message}`);
      } else {
        setMessage('Senha alterada com sucesso!');
        window.location.href = '/login'; // Redireciona para a página de login
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-center bg-cover gap-2 flex-col">
      <h2>Redefinir Senha</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-lg font-medium">
            Nova Senha:
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-lg font-medium">
            Confirmar Senha:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          {loading ? 'Alterando...' : 'Alterar Senha'}
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default ResetPassword;