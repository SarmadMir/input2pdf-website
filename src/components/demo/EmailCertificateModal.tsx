'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Loader2 } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  pdfUrl: string;
  recipientName: string;
}

type ModalState = 'form' | 'sending' | 'success' | 'error';

export function EmailCertificateModal({ open, onClose, onSuccess, pdfUrl, recipientName }: Props) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<ModalState>('form');
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (open) {
      setState('form');
      setErrorMsg('');
    }
  }, [open]);

  useEffect(() => {
    if (state === 'success') {
      const timer = setTimeout(onClose, 2500);
      return () => clearTimeout(timer);
    }
  }, [state, onClose]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please enter a valid email address');
      return;
    }

    setState('sending');
    setErrorMsg('');

    try {
      const res = await fetch(pdfUrl);
      const blob = await res.blob();
      const buffer = await blob.arrayBuffer();
      const pdfBase64 = btoa(
        new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      const apiRes = await fetch('/api/send-certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pdfBase64, recipientName }),
      });

      if (!apiRes.ok) {
        const data = await apiRes.json();
        throw new Error(data.error || 'Failed to send');
      }

      onSuccess?.();
      setState('success');
      setEmail('');
    } catch {
      setState('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <div
              className="relative w-full max-w-sm rounded-xl border border-border bg-surface-2 p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute right-3 top-3 rounded-md p-1 text-light-dark hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              {state === 'success' ? (
                <div className="flex flex-col items-center gap-3 py-4 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10">
                    <CheckCircle size={20} className="text-secondary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">Certificate sent!</p>
                  <p className="text-xs text-light-dark">Check your inbox</p>
                </div>
              ) : (
                <>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">
                    Email this certificate
                  </h3>
                  <p className="mb-5 text-xs text-light-dark">
                    Send this certificate to your inbox
                  </p>
                  <form onSubmit={handleSubmit}>
                    <input
                      ref={inputRef}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-light-dark focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                      disabled={state === 'sending'}
                    />
                    {errorMsg && (
                      <p className="mt-2 text-xs text-red-400">{errorMsg}</p>
                    )}
                    <button
                      type="submit"
                      disabled={state === 'sending'}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-60"
                    >
                      {state === 'sending' ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          Send Certificate
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
