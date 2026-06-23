import React from 'react';
import { Rate as AntRate, type RateProps as AntRateProps } from 'antd';
import { cn } from '@/utils/cn';

/* ─── KRate ─────────────────────────────────────────────────────
   NEW component added during the AntD migration (Khor had no Rate).
   Thin wrapper over AntD Rate; star color follows the brand secondary
   (#E04D36) so it matches the Khor accent treatment.
──────────────────────────────────────────────────────────────── */

export interface KRateProps extends AntRateProps {
  label?: React.ReactNode;
}

export const KRate = React.forwardRef<HTMLUListElement, KRateProps>(function KRate(
  { className, label, ...rest },
  ref,
) {
  const rate = (
    <AntRate
      ref={ref as any}
      className={cn('font-primary [&_.ant-rate-star-full_.anticon]:text-[#E04D36]', className)}
      {...rest}
    />
  );

  if (!label) return rate;

  return (
    <label className="inline-flex items-center gap-2 select-none">
      <span className="text-sm font-medium text-[#1e293b]">{label}</span>
      {rate}
    </label>
  );
});

KRate.displayName = 'KRate';
export default KRate;
