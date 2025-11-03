import { NextRequest, NextResponse } from 'next/server'

const WORDPRESS_API_BASE = 'https://ish-vara.com/wp-json/wp/v2'

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    // Reconstruct the WordPress API path
    const path = params.path.join('/')
    const url = new URL(request.url)
    
    // Forward all query parameters
    const searchParams = url.searchParams.toString()
    const wpUrl = `${WORDPRESS_API_BASE}/${path}${searchParams ? `?${searchParams}` : ''}`
    
    // Fetch from WordPress (server-side, no CORS issues)
    const response = await fetch(wpUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      return NextResponse.json(
        { error: `WordPress API error: ${response.status}` },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    
    // Return with CORS headers to allow your frontend to access it
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    console.error('Proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch from WordPress API' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

