"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export type PoemLength = "short" | "medium" | "long";

interface PoemLengthSelectorProps {
  value: PoemLength;
  onChange: (value: PoemLength) => void;
}

export function PoemLengthSelector({ value, onChange }: PoemLengthSelectorProps) {
  const lengths: { id: PoemLength; label: string }[] = [
    { id: "short", label: "Short" },
    { id: "medium", label: "Medium" },
    { id: "long", label: "Long" },
  ];

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Poem Length</CardTitle>
        <CardDescription>Choose the desired length for your poem.</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={value}
          onValueChange={(val) => onChange(val as PoemLength)}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {lengths.map((length) => (
            <Label
              key={length.id}
              htmlFor={`length-${length.id}`}
              className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors"
            >
              <RadioGroupItem value={length.id} id={`length-${length.id}`} className="sr-only" />
              <span className="font-semibold">{length.label}</span>
            </Label>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
