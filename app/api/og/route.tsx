import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Outcome Labs';

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${title}</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
        color: #fafafa;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 40px;
      }
      .container { max-width: 800px; text-align: center; }
      .logo { font-size: 24px; font-weight: 700; color: #d4a574; margin-bottom: 24px; letter-spacing: 2px; }
      h1 {
        font-size: 56px; font-weight: 800; line-height: 1.1; margin-bottom: 24px;
        background: linear-gradient(135deg, #d4a574 0%, #f0c896 100%);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      }
      p { font-size: 24px; color: #a1a1aa; line-height: 1.5; }
      .badge {
        position: absolute; top: 40px; right: 40px;
        background: #d4a574; color: #0a0a0a;
        padding: 8px 16px; border-radius: 999px; font-size: 14px; font-weight: 600;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">OUTCOME LABS</div>
      <h1>${title}</h1>
      <p>Revenue engineering for growth companies</p>
    </div>
    <div class="badge">REVENUE ENGINEERING</div>
  </body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  });
}
