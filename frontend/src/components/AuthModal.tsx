import React, { useState } from 'react';
import { authAPI } from '../services/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (token: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authAPI.register(phoneNumber);
      setStep('otp');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de l\'envoi du code');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(phoneNumber, otp);
      const token = response.data.accessToken;
      localStorage.setItem('token', token);
      onSuccess(token);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Code incorrect');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {step === 'phone' ? 'Connexion' : 'Code de vérification'}
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {step === 'phone' ? (
          <form onSubmit={handlePhoneSubmit}>
            <input
              type="tel"
              placeholder="Numéro de téléphone"
              className="w-full p-3 border rounded mb-4"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 p-3 border rounded"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 p-3 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                {loading ? 'Envoi...' : 'Envoyer code'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <p className="text-sm text-gray-600 mb-4">
              Code envoyé au {phoneNumber}
            </p>
            <input
              type="text"
              placeholder="Code à 6 chiffres"
              className="w-full p-3 border rounded mb-4"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              required
            />
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="flex-1 p-3 border rounded"
              >
                Retour
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 p-3 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                {loading ? 'Vérification...' : 'Se connecter'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;