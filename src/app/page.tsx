"use client";

import { useState } from "react";
import { PhotoUpload } from "@/components/photo-poet/PhotoUpload";
import { PoemLengthSelector, type PoemLength } from "@/components/photo-poet/PoemLengthSelector";
import { PoemDisplay } from "@/components/photo-poet/PoemDisplay";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import { generatePoem } from "@/ai/flows/generate-poem";

export default function PhotoPoetPage() {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [poem, setPoem] = useState<string | null>(null);
  const [poemLength, setPoemLength] = useState<PoemLength>("medium");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePhotoSelect = (dataUrl: string | null) => {
    setImageDataUrl(dataUrl);
    setPoem(null); // Clear previous poem when photo changes
    setError(null); // Clear previous error
  };

  const handleGeneratePoem = async () => {
    if (!imageDataUrl) {
      setError("Please upload a photo first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setPoem(null);

    try {
      const result = await generatePoem({
        photoDataUri: imageDataUrl,
        poemLength: poemLength,
      });
      setPoem(result.poem);
    } catch (e: any) {
      console.error("Error generating poem:", e);
      setError(e.message || "An unexpected error occurred while generating the poem.");
      setPoem(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/30 dark:from-background dark:to-secondary/20">
      <header className="py-8 sm:py-12 text-center shadow-sm bg-card/80 backdrop-blur-sm">
        <h1 className="text-5xl sm:text-6xl font-bold font-dancing-script text-primary">
          Photo Poet
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mt-2">
          Transform your photos into beautiful poetry.
        </p>
      </header>

      <main className="flex-grow container mx-auto p-4 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left Column: Controls */}
          <section className="lg:col-span-2 flex flex-col space-y-6 p-6 bg-card rounded-xl shadow-xl">
            <PhotoUpload onPhotoSelect={handlePhotoSelect} imageDataUrl={imageDataUrl} />
            
            {imageDataUrl && (
              <PoemLengthSelector value={poemLength} onChange={setPoemLength} />
            )}
            
            <Button 
              onClick={handleGeneratePoem} 
              disabled={!imageDataUrl || isLoading}
              size="lg"
              className="w-full transition-all duration-300 ease-in-out hover:shadow-primary/50 hover:scale-105 active:scale-100"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-5 w-5" />
              )}
              Generate Poem
            </Button>
            
            {error && (
              <Alert variant="destructive" className="shadow-md">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Generation Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </section>

          {/* Right Column: Display */}
          <section className="lg:col-span-3 p-0 bg-card rounded-xl shadow-xl min-h-[60vh] lg:min-h-0">
            <PoemDisplay imageDataUrl={imageDataUrl} poem={poem} isLoading={isLoading} />
          </section>
        </div>
      </main>

      <footer className="text-center py-8 mt-auto text-muted-foreground/80 bg-card/50">
        <p>&copy; {new Date().getFullYear()} Photo Poet. Crafted with imagination.</p>
      </footer>
    </div>
  );
}
