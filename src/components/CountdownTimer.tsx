import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { getTimeLeft } from '@/lib/utils';
import clsx from 'clsx';

type CountdownTimerProps = {
  endTime: string;
  large?: boolean;
  onExpired?: () => void;
};

export default function CountdownTimer({ endTime, large = false, onExpired }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(endTime));

  useEffect(() => {
    const interval = setInterval(() => {
      const t = getTimeLeft(endTime);
      setTimeLeft(t);
      if (t.total <= 0 && onExpired) {
        onExpired();
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime, onExpired]);

  const isUrgent = timeLeft.total > 0 && timeLeft.total < 10 * 60 * 1000;
  const isExpired = timeLeft.total <= 0;

  if (isExpired) {
    return (
      <div className={clsx('flex items-center gap-2', large ? 'text-2xl' : 'text-sm')}>
        <Clock size={large ? 24 : 14} className="text-gray-400" />
        <span className="text-gray-400 font-mono font-bold">EXPIRED</span>
      </div>
    );
  }

  return (
    <div className={clsx('flex items-center gap-3', isUrgent ? 'countdown-urgent' : '')}>
      <Clock size={large ? 24 : 14} className={clsx(isUrgent ? 'text-red-400' : 'text-gold')} />
      <div className={clsx('flex gap-1 font-mono font-bold', large ? 'text-4xl' : 'text-lg')}>
        <div className={clsx('flex flex-col items-center', large ? 'bg-dark-3 px-3 py-2 rounded-lg' : '')}>
          <span className={isUrgent ? 'text-red-400' : 'text-gold'}>{String(timeLeft.hours).padStart(2, '0')}</span>
          {large && <span className="text-xs text-cream/40 font-normal mt-1">HRS</span>}
        </div>
        <span className={clsx(isUrgent ? 'text-red-400' : 'text-gold')}>{large ? ':' : ':'}</span>
        <div className={clsx('flex flex-col items-center', large ? 'bg-dark-3 px-3 py-2 rounded-lg' : '')}>
          <span className={isUrgent ? 'text-red-400' : 'text-gold'}>{String(timeLeft.minutes).padStart(2, '0')}</span>
          {large && <span className="text-xs text-cream/40 font-normal mt-1">MIN</span>}
        </div>
        <span className={clsx(isUrgent ? 'text-red-400' : 'text-gold')}>{large ? ':' : ':'}</span>
        <div className={clsx('flex flex-col items-center', large ? 'bg-dark-3 px-3 py-2 rounded-lg' : '')}>
          <span className={isUrgent ? 'text-red-400' : 'text-gold'}>{String(timeLeft.seconds).padStart(2, '0')}</span>
          {large && <span className="text-xs text-cream/40 font-normal mt-1">SEC</span>}
        </div>
      </div>
    </div>
  );
}
