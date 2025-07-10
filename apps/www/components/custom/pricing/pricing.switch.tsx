"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";

interface PricingSwitchProps {
  onYearlyBillingChange?: (isYearly: boolean) => void;
}

export default function PricingSwitch({
  onYearlyBillingChange,
}: PricingSwitchProps) {
  const [isYearly, setIsYearly] = useState<boolean>(true);
  useEffect(() => {
    if (onYearlyBillingChange) {
      onYearlyBillingChange(isYearly);
    }
  }, [isYearly, onYearlyBillingChange]);

  return (
    <div className="flex items-center space-x-2 rounded-xl bg-[#171717] shadow-lg py-2 px-3 border">
      <Switch
        id="yearly-mode"
        checked={isYearly}
        onCheckedChange={setIsYearly}
      />
      <Label htmlFor="yearly-mode" className="transition-all duration-300">
        Billed Yearly
      </Label>
    </div>
  );
}
