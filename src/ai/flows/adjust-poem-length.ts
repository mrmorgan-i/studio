'use server';

/**
 * @fileOverview This flow allows users to adjust the length of the generated poem (short, medium, long).
 *
 * - adjustPoemLength - A function that handles the poem length adjustment process.
 * - AdjustPoemLengthInput - The input type for the adjustPoemLength function.
 * - AdjustPoemLengthOutput - The return type for the adjustPoemLength function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdjustPoemLengthInputSchema = z.object({
  poem: z.string().describe('The poem to be adjusted.'),
  length: z
    .enum(['short', 'medium', 'long'])
    .describe('The desired length of the poem.'),
});
export type AdjustPoemLengthInput = z.infer<typeof AdjustPoemLengthInputSchema>;

const AdjustPoemLengthOutputSchema = z.object({
  adjustedPoem: z.string().describe('The poem adjusted to the desired length.'),
});
export type AdjustPoemLengthOutput = z.infer<typeof AdjustPoemLengthOutputSchema>;

export async function adjustPoemLength(
  input: AdjustPoemLengthInput
): Promise<AdjustPoemLengthOutput> {
  return adjustPoemLengthFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adjustPoemLengthPrompt',
  input: {schema: AdjustPoemLengthInputSchema},
  output: {schema: AdjustPoemLengthOutputSchema},
  prompt: `Adjust the following poem to be {{length}} in length.\n\nPoem: {{{poem}}}`,
});

const adjustPoemLengthFlow = ai.defineFlow(
  {
    name: 'adjustPoemLengthFlow',
    inputSchema: AdjustPoemLengthInputSchema,
    outputSchema: AdjustPoemLengthOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
