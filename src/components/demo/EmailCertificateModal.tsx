'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

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
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKey);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
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

  if (typeof document === 'undefined') return null;

  return createPortal(
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
              className="relative w-full max-w-sm rounded-xl border border-border bg-surface-2 p-6 shadow-2xl shadow-black/20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute right-3 top-3 cursor-pointer rounded-md p-1.5 text-light-dark transition-colors hover:text-foreground"
                aria-label="Close"
              >
                <X size={14} />
              </button>

              {state === 'success' ? (
                <div className="flex flex-col items-center gap-3 py-6 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10">
                    <CheckCircle size={20} className="text-secondary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">Certificate sent!</p>
                  <p className="text-xs text-light-dark">Check your inbox</p>
                </div>
              ) : (
                <>
                  <div className="mb-5">
                    <h3 className="text-sm font-semibold text-foreground">
                      Email this certificate
                    </h3>
                    <p className="mt-1 text-xs text-light-dark">
                      Send this certificate to your inbox
                    </p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="cert-email" className="mb-2 block text-xs font-medium uppercase tracking-widest text-foreground/60 font-mono">
                      Email Address
                    </label>
                    <input
                      ref={inputRef}
                      id="cert-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full rounded-lg border border-primary/40 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-light-dark transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
                      disabled={state === 'sending'}
                    />
                    {errorMsg && (
                      <p className="mt-2 text-xs text-red-400">{errorMsg}</p>
                    )}
                    <Button
                      type="submit"
                      disabled={state === 'sending'}
                      variant="primary"
                      className="mt-4 w-full"
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
                    </Button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
