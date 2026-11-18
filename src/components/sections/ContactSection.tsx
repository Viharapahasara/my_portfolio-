import React, { useState } from 'react';
import {
  Check,
  Clock,
  Copy,
  Mail,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import { ContactData } from '../../types/portfolio';
import { SectionContainer } from '../common/SectionContainer';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { cn } from '../../utils/cn';

interface ContactSectionProps {
  data: ContactData;
}

const MAX_MESSAGE_LENGTH = 1000;

/**
 * Contact section combining direct availability details with a clean,
 * focused message box that sends the user's message directly to WhatsApp.
 */
export const ContactSection: React.FC<ContactSectionProps> = ({ data }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [launchedWhatsApp, setLaunchedWhatsApp] = useState(false);

  const sanitizedNumber = data.whatsappNumber.replace(/[^\d]/g, '');
  const trimmedMessage = message.trim();
  const whatsappUrl = `https://wa.me/${sanitizedNumber}?text=${encodeURIComponent(
    trimmedMessage
  )}`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(data.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleWhatsAppAction = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (trimmedMessage.length < 3) {
      e.preventDefault();
      setError('Please enter your message before sending to WhatsApp.');
      return;
    }
    setError(null);
    setLaunchedWhatsApp(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trimmedMessage.length < 3) {
      setError('Please enter your message before sending to WhatsApp.');
      return;
    }
    setError(null);
  };

  return (
    <SectionContainer id={data.id} ariaLabel="Contact">
      <SectionHeading title={data.heading} intro={data.intro} />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Left Column: Direct Details & Availability */}
        <ScrollReveal gaze="left" yOffset={28} className="flex flex-col justify-between gap-8 lg:col-span-5">
          <div className="space-y-6 rounded-2xl border border-[#2F3137] bg-[#222327] p-6 sm:p-7">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#A6B8CA] uppercase">
                Direct Contact
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={`mailto:${data.email}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#F3F4F6] transition-colors hover:text-[#A6B8CA] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A6B8CA] sm:text-base"
                >
                  <Mail className="h-4 w-4 shrink-0 text-[#A6B8CA]" aria-hidden="true" />
                  <span className="break-all">{data.email}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-[#383B42] bg-[#1B1B1D] px-3 py-1.5 text-xs font-medium text-[#D1D5DB] transition-colors hover:border-[#A6B8CA]/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6B8CA] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#A6B8CA]" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-4 border-t border-[#2F3137] pt-5 text-sm text-[#D1D5DB]">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#A6B8CA]" aria-hidden="true" />
                <span>{data.location}</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#A6B8CA]" aria-hidden="true" />
                <span>{data.responseTime}</span>
              </div>
            </div>

            <div className="border-t border-[#2F3137] pt-5">
              <p className="text-xs font-semibold tracking-wider text-[#9CA3AF] uppercase">
                Availability
              </p>
              <p className="mt-1.5 text-sm font-medium text-[#F3F4F6]">
                {data.availability}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Right Column: Focused WhatsApp Message Form */}
        <ScrollReveal gaze="right" yOffset={28} delay={0.08} className="flex flex-col justify-center lg:col-span-7">
          <form onSubmit={handleFormSubmit} noValidate className="space-y-7">
            <div>
              <div className="flex items-center justify-between gap-4">
                <label
                  htmlFor="whatsapp-message"
                  className="block text-xs font-semibold tracking-wider text-[#9CA3AF] uppercase"
                >
                  Message
                </label>
                <span className="font-mono text-xs text-[#9CA3AF] tabular-nums">
                  {message.length}/{MAX_MESSAGE_LENGTH}
                </span>
              </div>

              <textarea
                id="whatsapp-message"
                name="message"
                rows={5}
                maxLength={MAX_MESSAGE_LENGTH}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (error) setError(null);
                  if (launchedWhatsApp) setLaunchedWhatsApp(false);
                }}
                placeholder="Type your message here to send directly on WhatsApp..."
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'whatsapp-message-error' : undefined}
                className={cn(
                  'mt-3 w-full resize-y border-b bg-transparent py-3 text-base text-[#F3F4F6] placeholder-[#6B7280] transition-colors focus:outline-none',
                  error
                    ? 'border-rose-400 focus:border-rose-300'
                    : 'border-[#4B5563] focus:border-[#A6B8CA]'
                )}
              />

              {error && (
                <p id="whatsapp-message-error" className="mt-2 text-xs text-rose-400">
                  {error}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppAction}
                className="inline-flex min-h-[44px] items-center gap-2.5 rounded-lg bg-[#A6B8CA] px-6 py-2.5 text-xs font-semibold tracking-[0.14em] text-[#16171A] uppercase transition-colors duration-200 hover:bg-[#C2D2E2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6B8CA] whitespace-nowrap shrink-0 sm:text-sm"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>{data.submitLabel}</span>
              </a>

              {launchedWhatsApp && (
                <span role="status" className="text-xs text-[#A6B8CA]">
                  WhatsApp chat opened with your message.
                </span>
              )}
            </div>
          </form>
        </ScrollReveal>
      </div>
    </SectionContainer>
  );
};
