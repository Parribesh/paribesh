'use client'

import { useEffect, useState } from 'react'

const WORDPRESS_API_URL = 'https://ish-vara.com/wp-json/wp/v2'

// Configure your category here:
// Option 1: Use category ID (number) - e.g., 5
// Option 2: Use category slug (string) - e.g., 'paribesh'
// Set to null or undefined to fetch all posts
const CATEGORY_FILTER: number | string | null = 'paribesh' // Change this to your category

interface Post {
  id: number
  title: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  link: string
  categories: number[]
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        // Build API URL with category filter
        let apiUrl = `${WORDPRESS_API_URL}/posts?per_page=10`
        
        if (CATEGORY_FILTER !== null && CATEGORY_FILTER !== undefined) {
          // Use category ID if it's a number, or slug if it's a string
          if (typeof CATEGORY_FILTER === 'number') {
            apiUrl += `&categories=${CATEGORY_FILTER}`
          } else {
            // First, get category ID from slug
            const categoryResponse = await fetch(
              `${WORDPRESS_API_URL}/categories?slug=${CATEGORY_FILTER}`
            )
            const categoryData = await categoryResponse.json()
            
            if (categoryData.length > 0) {
              apiUrl += `&categories=${categoryData[0].id}`
            } else {
              throw new Error(`Category "${CATEGORY_FILTER}" not found`)
            }
          }
        }
        
        const response = await fetch(apiUrl)
        
        if (!response.ok) {
          throw new Error(`WordPress API error: ${response.status}`)
        }
        
        const data = await response.json()
        setPosts(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch posts')
        console.error('Error fetching WordPress posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <main style={{ 
      padding: '2rem', 
      maxWidth: '1200px', 
      margin: '0 auto',
      minHeight: '100vh'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '3rem',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        marginTop: '2rem'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '0.5rem',
          color: '#333',
          fontWeight: '700'
        }}>
          🎉 Paribesh.ish-vara.com
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#666',
          marginBottom: '2rem'
        }}>
          Next.js Frontend connected to WordPress Backend
        </p>

        <div style={{
          padding: '1rem',
          background: '#f8f9fa',
          borderRadius: '8px',
          marginBottom: '2rem',
          border: '1px solid #e9ecef'
        }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <strong>API Endpoint:</strong> {WORDPRESS_API_URL}
          </div>
          <div>
            <strong>Filtering by Category:</strong>{' '}
            {CATEGORY_FILTER 
              ? <span style={{ color: '#667eea', fontWeight: '600' }}>"{CATEGORY_FILTER}"</span>
              : <span style={{ color: '#999' }}>All posts</span>
            }
          </div>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Loading posts from WordPress...</p>
          </div>
        )}

        {error && (
          <div style={{
            background: '#fee',
            border: '1px solid #fcc',
            borderRadius: '8px',
            padding: '1rem',
            color: '#c33',
            marginBottom: '2rem'
          }}>
            <strong>Error:</strong> {error}
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
              This might be a CORS issue. Check if WordPress allows requests from this domain.
            </p>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div>
            <h2 style={{
              fontSize: '1.8rem',
              marginBottom: '1.5rem',
              color: '#333'
            }}>
              Latest Posts from WordPress: This is from Paribesh the Neupane. 
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {posts.map((post) => (
                <div key={post.id} style={{
                  border: '1px solid #e9ecef',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  background: 'white',
                  transition: 'box-shadow 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                }}
                onClick={() => window.open(post.link, '_blank')}
                >
                  <h3 style={{
                    fontSize: '1.3rem',
                    marginBottom: '0.5rem',
                    color: '#333'
                  }}>
                    {post.title.rendered}
                  </h3>
                  <div 
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    style={{
                      color: '#666',
                      fontSize: '0.95rem',
                      lineHeight: '1.6'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>No posts found.</p>
          </div>
        )}
      </div>
    </main>
  )
}

