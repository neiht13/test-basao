
import sharp from 'sharp';

/**
 * Optimizes a base64 image string on the server side using Sharp.
 * Converts to AVIF format for optimal compression and quality.
 * 
 * @param base64String The full base64 string (including data:image/...;base64, prefix)
 * @param width Target width (optional, default 800)
 * @param height Target height (optional)
 * @param quality Quality setting (1-100, default 80)
 * @returns Promise<string> The optimized base64 string (data:image/avif;base64,...)
 */
export async function optimizeImage(
    base64String: string | undefined,
    width: number = 800,
    height?: number,
    quality: number = 80
): Promise<string | undefined> {
    if (!base64String || !base64String.startsWith('data:image/')) {
        return base64String;
    }

    try {
        // Extract the base64 data
        const matches = base64String.match(/^data:image\/([a-zA-Z+]+);base64,(.+)$/);

        if (!matches || matches.length !== 3) {
            return base64String;
        }

        const buffer = Buffer.from(matches[2], 'base64');

        // Create sharp instance
        let pipeline = sharp(buffer);

        // Resize if width is provided
        if (width) {
            pipeline = pipeline.resize(width, height, {
                fit: 'inside', // Maintain aspect ratio
                withoutEnlargement: true
            });
        }

        // Convert to AVIF
        const optimizedBuffer = await pipeline
            .avif({ quality: quality })
            .toBuffer();

        // Convert back to base64
        return `data:image/avif;base64,${optimizedBuffer.toString('base64')}`;
    } catch (error) {
        console.error('Image optimization error:', error);
        // Fallback to original if optimization fails
        return base64String;
    }
}
