'use client';

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    // Enviar o e-mail com o link de redefinição de senha
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/newPassword', // URL para redirecionar o usuário após confirmar o e-mail
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Se o e-mail estiver registrado, você receberá um link para redefinir sua senha.');
    }
    setLoading(false);
  };

  return (
    <div className="reset-password-page">
      <h2>Redefinir Senha</h2>
      <form onSubmit={handleResetPassword}>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Carregando...' : 'Enviar Link de Redefinição'}
        </button>
      </form>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      <style jsx>{`
        .reset-password-page {
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
        }

        .reset-password-page h2 {
          text-align: center;
        }

        .reset-password-page form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .reset-password-page input {
          padding: 10px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .reset-password-page button {
          padding: 10px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .reset-password-page button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .success-message {
          margin-top: 15px;
          color: green;
        }

        .error-message {
          margin-top: 15px;
          color: red;
        }
      `}</style>
    </div>
  );
};

export default ResetPassword;
