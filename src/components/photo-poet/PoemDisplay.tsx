"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageIcon, Feather } from "lucide-react";
import { useEffect, useState } from "react";

interface PoemDisplayProps {
  imageDataUrl: string | null;
  poem: string | null;
  isLoading: boolean;
}

export function PoemDisplay({ imageDataUrl, poem, isLoading }: PoemDisplayProps) {
  const [showPoem, setShowPoem] = useState(false);

  useEffect(() => {
    if (poem && !isLoading) {
      // Reset and trigger fade-in
      setShowPoem(false);
      const timer = setTimeout(() => setShowPoem(true), 100); // Small delay to ensure CSS transition triggers
      return () => clearTimeout(timer);
    } else if (!poem) {
      setShowPoem(false);
    }
  }, [poem, isLoading]);

  return (
    <Card className="h-full flex flex-col shadow-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <Feather className="mr-3 text-primary" />
          Your Poetic Vision
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col items-center justify-center p-6 space-y-6">
        {!imageDataUrl ? (
          <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-full">
            <ImageIcon size={64} className="mb-4 opacity-50" />
            <p className="text-lg">Upload a photo to begin.</p>
            <p>Your generated poem will appear here alongside your image.</p>
          </div>
        ) : (
          <div className="w-full space-y-6">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md">
              <Image
                src={imageDataUrl}
                alt="Uploaded content"
                layout="fill"
                objectFit="contain"
                data-ai-hint="user provided image"
              />
            </div>
            
            {isLoading && !poem && (
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
                <p className="text-center text-muted-foreground animate-pulse">Crafting your poem...</p>
              </div>
            )}

            {poem && (
              <div 
                className={`font-dancing-script text-xl sm:text-2xl leading-relaxed text-foreground p-4 border border-primary/20 rounded-lg bg-primary/5 shadow-inner transition-opacity duration-1000 ease-in-out ${showPoem ? 'opacity-100' : 'opacity-0'}`}
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {poem}
              </div>
            )}
            
            {!isLoading && !poem && (
                <p className="text-center text-muted-foreground py-8">
                    Click "Generate Poem" to see the magic happen.
                </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
