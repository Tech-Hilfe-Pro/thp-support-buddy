import satori from 'satori';
import { Resvg } from '@resvg/resvg-wasm';

export async function onRequest(context: any) {
  const { request } = context;
  const url = new URL(request.url);
  
  // Get title and subtitle from query params
  const title = url.searchParams.get('title') || 'Tech Hilfe Pro';
  const subtitle = url.searchParams.get('subtitle') || 'Schneller IT-Support für Zuhause & KMU';
  
  // Create cache key
  const cacheKey = `og-image-${title}-${subtitle}`;
  const cache = caches.default;
  
  // Check cache first
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    // Load Inter font
    const fontResponse = await fetch('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2');
    const fontData = await fontResponse.arrayBuffer();
    
    // Generate SVG with Satori
    const svg = await satori(
      {
        type: 'div',
        props: {
          style: {
            width: '1200px',
            height: '630px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            fontFamily: 'Inter',
            position: 'relative',
          },
          children: [
            // Background decoration
            {
              type: 'div',
              props: {
                style: {
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                  background: 'radial-gradient(circle at 80% 20%, rgba(79, 70, 229, 0.1) 0%, transparent 50%)',
                },
              },
            },
            // Logo area
            {
              type: 'div',
              props: {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '40px',
                },
                children: [
                  {
                    type: 'div',
                    props: {
                      style: {
                        width: '60px',
                        height: '60px',
                        background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                        borderRadius: '12px',
                        marginRight: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                      children: [
                        {
                          type: 'div',
                          props: {
                            style: {
                              color: 'white',
                              fontSize: '24px',
                              fontWeight: '600',
                            },
                            children: 'T',
                          },
                        },
                      ],
                    },
                  },
                  {
                    type: 'span',
                    props: {
                      style: {
                        fontSize: '28px',
                        fontWeight: '600',
                        color: '#1f2937',
                      },
                      children: 'Tech Hilfe Pro',
                    },
                  },
                ],
              },
            },
            // Main title
            {
              type: 'h1',
              props: {
                style: {
                  fontSize: '64px',
                  fontWeight: '700',
                  color: '#111827',
                  textAlign: 'center',
                  marginBottom: '20px',
                  lineHeight: '1.1',
                  maxWidth: '900px',
                },
                children: title,
              },
            },
            // Subtitle
            {
              type: 'p',
              props: {
                style: {
                  fontSize: '32px',
                  color: '#6b7280',
                  textAlign: 'center',
                  maxWidth: '800px',
                  lineHeight: '1.3',
                },
                children: subtitle,
              },
            },
            // Bottom decoration
            {
              type: 'div',
              props: {
                style: {
                  position: 'absolute',
                  bottom: '40px',
                  right: '40px',
                  color: '#9ca3af',
                  fontSize: '18px',
                },
                children: 'Köln & Neuss',
              },
            },
          ],
        },
      },
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: fontData,
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Inter',
            data: fontData,
            weight: 600,
            style: 'normal',
          },
          {
            name: 'Inter',
            data: fontData,
            weight: 700,
            style: 'normal',
          },
        ],
      }
    );
    
    // Convert SVG to PNG with Resvg
    const resvg = new Resvg(svg);
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();
    
    // Create response
    const response = new Response(pngBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
    
    // Cache the response
    context.waitUntil(cache.put(request, response.clone()));
    
    return response;
    
  } catch (error) {
    console.error('OG Image generation error:', error);
    
    // Fallback to a simple error image
    const errorSvg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <rect width="1200" height="630" fill="#f8fafc"/>
        <text x="600" y="315" text-anchor="middle" font-family="Arial" font-size="48" fill="#1f2937">
          Tech Hilfe Pro
        </text>
      </svg>
    `;
    
    return new Response(errorSvg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=300',
      },
    });
  }
}