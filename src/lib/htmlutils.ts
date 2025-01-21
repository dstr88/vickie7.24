//   ./src/lib/htmlutils.ts

import he from 'he'; // For decoding HTML entities
import DOMPurify from 'dompurify'; // For sanitization
import { JSDOM } from 'jsdom'; // For server-side DOM simulation

// Debugging: Ensure libraries are imported correctly
console.log('he:', he);
console.log('DOMPurify:', DOMPurify);

/**
 * Decodes HTML entities in a string.
 * @param text - The string containing HTML entities.
 * @returns The decoded string.
 */
export function decodeHtmlEntities(text: string): string {
  try {
    return he.decode(text); // Fully decode all HTML entities
  } catch (error) {
    console.error('Error decoding HTML entities:', error);
    return text; // Return the original text if decoding fails
  }
}

/**
 * Sanitizes HTML content to prevent XSS attacks.
 * This function works in a server-side environment using JSDOM.
 * @param html - The HTML content to sanitize.
 * @returns The sanitized HTML.
 */
export function sanitizeHtml(html: string): string {
  try {
    const { window } = new JSDOM(''); // Create a simulated DOM environment
    const purify = DOMPurify(window); // Initialize DOMPurify with the simulated DOM

    console.log('Sanitizing HTML:', html); // Debugging
    const sanitized = purify.sanitize(html); // Use DOMPurify to sanitize
    console.log('Sanitized HTML:', sanitized); // Debugging
    return sanitized;
  } catch (error) {
    console.error('Error sanitizing HTML:', error);
    return html; // Return the original HTML if sanitization fails
  }
}
