import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, RefreshCw } from 'lucide-react';
import './CodeVerification.scss';

const CodeVerification = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInput = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Only allow single digits

    setCode(prev => {
      const newCode = [...prev];
      newCode[index] = value;
      return newCode;
    });

    setError('');

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      // Move to previous input on backspace if current input is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const digits = pastedData.replace(/\D/g, '').split('');
    
    setCode(prev => {
      const newCode = [...prev];
      digits.forEach((digit, index) => {
        if (index < 6) newCode[index] = digit;
      });
      return newCode;
    });

    // Focus last filled input or first empty input
    const lastIndex = Math.min(digits.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleSubmit = async () => {
    if (code.some(digit => !digit)) {
      setError('Please enter all digits');
      return;
    }

    setIsVerifying(true);
    setError('');

    // Simulate verification
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Mock verification - replace with actual API call
      if (code.join('') === '123456') {
        console.log('Verification successful');
      } else {
        setError('Invalid verification code');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    // Simulate resending code
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Code resent');
  };

  return (
    <div className="verification">
      <div className="verification__container">
        <div className="verification__header">
          <h1>Enter Verification Code</h1>
          <p>We've sent a 6-digit code to your email</p>
        </div>

        <div className="verification__code-inputs">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleInput(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={error ? 'error' : ''}
              autoComplete="off"
            />
          ))}
        </div>

        {error && (
          <div className="verification__error">
            {error}
          </div>
        )}

        <button 
          className="verification__submit"
          onClick={handleSubmit}
          disabled={isVerifying}
        >
          {isVerifying ? (
            <>
              <RefreshCw className="spin" size={20} />
              Verifying...
            </>
          ) : (
            <>
              Verify Code
              <ArrowRight size={20} />
            </>
          )}
        </button>

        <button 
          className="verification__resend"
          onClick={handleResend}
        >
          Didn't receive the code? Resend
        </button>
      </div>
    </div>
  );
};

export default CodeVerification;