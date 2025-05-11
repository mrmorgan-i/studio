"use client";

import { useState, type ChangeEvent, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud, XCircle } from "lucide-react";

interface PhotoUploadProps {
  onPhotoSelect: (dataUrl: string | null) => void;
  imageDataUrl: string | null;
}

export function PhotoUpload({ onPhotoSelect, imageDataUrl }: PhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onPhotoSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      onPhotoSelect(null);
    }
  };

  const handleClearPhoto = () => {
    onPhotoSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Upload Your Photo</CardTitle>
        <CardDescription>Select an image to inspire a poem.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          id="photo-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
        
        {!imageDataUrl ? (
          <div
            onClick={triggerFileInput}
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-muted-foreground/50 rounded-lg cursor-pointer hover:bg-muted transition-colors"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && triggerFileInput()}
          >
            <UploadCloud className="w-12 h-12 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">Click or tap to upload a photo</p>
            <p className="text-xs text-muted-foreground/80">PNG, JPG, GIF, WEBP</p>
          </div>
        ) : (
          <div className="relative group">
            <Image
              src={imageDataUrl}
              alt="Uploaded preview"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full aspect-[4/3]"
              data-ai-hint="user uploaded image"
            />
            <Button
              variant="destructive"
              size="icon"
              onClick={handleClearPhoto}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Remove photo"
            >
              <XCircle className="h-5 w-5" />
            </Button>
          </div>
        )}
        
        <Button onClick={triggerFileInput} variant="outline" className="w-full">
          <UploadCloud className="mr-2 h-4 w-4" />
          {imageDataUrl ? "Change Photo" : "Select Photo"}
        </Button>

      </CardContent>
    </Card>
  );
}
