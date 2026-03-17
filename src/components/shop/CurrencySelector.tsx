"use client";

import { useCurrency } from "@/components/providers/CurrencyProvider";
import { SUPPORTED_CURRENCIES, CurrencyCode } from "@/lib/currency";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 text-stone-600">
          <Globe className="w-4 h-4" />
          <span className="font-medium">{currency}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 bg-white">
        {Object.values(SUPPORTED_CURRENCIES).map((config) => (
          <DropdownMenuItem
            key={config.code}
            onClick={() => setCurrency(config.code)}
            className={`cursor-pointer ${currency === config.code ? 'bg-rose-50 text-rose-600 font-medium' : ''}`}
          >
            <span className="w-6 text-center">{config.symbol}</span>
            <span>{config.code}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
