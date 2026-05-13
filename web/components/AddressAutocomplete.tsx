"use client";

import { Autocomplete } from "@react-google-maps/api";
import { useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  "aria-invalid"?: boolean;
};

export function AddressAutocomplete({
  id,
  value,
  onChange,
  disabled,
  className,
  "aria-invalid": ariaInvalid,
}: Props) {
  const acRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onPlaceChanged = useCallback(() => {
    const place = acRef.current?.getPlace();
    const addr = place?.formatted_address ?? place?.name;
    if (addr) onChange(addr);
  }, [onChange]);

  return (
    <Autocomplete
      onLoad={(instance) => {
        acRef.current = instance;
      }}
      onPlaceChanged={onPlaceChanged}
      options={{
        componentRestrictions: { country: "ca" },
        types: ["address"],
      }}
    >
      <Input
        id={id}
        autoComplete="street-address"
        value={value}
        disabled={disabled}
        aria-invalid={ariaInvalid}
        onChange={(e) => onChange(e.target.value)}
        className={cn(className)}
        placeholder=""
      />
    </Autocomplete>
  );
}
