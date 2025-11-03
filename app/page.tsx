'use client'

import { useEffect, useState } from 'react'

// Use Next.js API proxy to avoid CORS issues
// This calls /api/wp/* which proxies to WordPress (server-side)
const WORDPRESS_API_URL = '/api/wp'

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

interface Category {
  id: number
  name: string
  slug: string
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [availableCategories, setAvailableCategories] = useState<Category[]>([])
  const [categoryId, setCategoryId] = useState<number | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        // First, fetch all categories to help with debugging
        const allCategoriesResponse = await fetch(`${WORDPRESS_API_URL}/categories`)
        if (allCategoriesResponse.ok) {
          const allCategories = await allCategoriesResponse.json()
          setAvailableCategories(allCategories)
        }
        
        // Build API URL with category filter
        let apiUrl = `${WORDPRESS_API_URL}/posts?per_page=10`
        let foundCategoryId: number | null = null
        
        if (CATEGORY_FILTER !== null && CATEGORY_FILTER !== undefined) {
          // Use category ID if it's a number, or slug if it's a string
          if (typeof CATEGORY_FILTER === 'number') {
            foundCategoryId = CATEGORY_FILTER
            apiUrl += `&categories=${CATEGORY_FILTER}`
          } else {
            // Try to find category by slug (case-insensitive)
            const categoryResponse = await fetch(
              `${WORDPRESS_API_URL}/categories?slug=${encodeURIComponent(CATEGORY_FILTER)}`
            )
            
            if (!categoryResponse.ok) {
              throw new Error(`Failed to fetch categories: ${categoryResponse.status}`)
            }
            
            const categoryData = await categoryResponse.json()
            
            if (categoryData.length > 0) {
              foundCategoryId = categoryData[0].id
              apiUrl += `&categories=${foundCategoryId}`
              setCategoryId(foundCategoryId)
            } else {
              // Try case-insensitive search by fetching all and filtering
              const allCatsResponse = await fetch(`${WORDPRESS_API_URL}/categories`)
              if (allCatsResponse.ok) {
                const allCats = await allCatsResponse.json()
                const matchingCat = allCats.find((cat: Category) => 
                  cat.slug.toLowerCase() === CATEGORY_FILTER.toLowerCase()
                )
                if (matchingCat) {
                  foundCategoryId = matchingCat.id
                  apiUrl += `&categories=${foundCategoryId}`
                  setCategoryId(foundCategoryId)
                } else {
                  throw new Error(
                    `Category "${CATEGORY_FILTER}" not found. Available categories: ${allCats.map((c: Category) => `"${c.slug}" (${c.name})`).join(', ')}`
                  )
                }
              } else {
                throw new Error(`Category "${CATEGORY_FILTER}" not found`)
              }
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
            <strong>API Endpoint:</strong> {WORDPRESS_API_URL} (proxying to ish-vara.com)
          </div>
          <div>
            <strong>Filtering by Category:</strong>{' '}
            {CATEGORY_FILTER 
              ? <span style={{ color: '#667eea', fontWeight: '600' }}>"{CATEGORY_FILTER}"</span>
              : <span style={{ color: '#999' }}>All posts</span>
            }
            {categoryId && (
              <span style={{ marginLeft: '0.5rem', color: '#999', fontSize: '0.9rem' }}>
                (ID: {categoryId})
              </span>
            )}
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
            {availableCategories.length > 0 && (
              <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                <strong>Available Categories:</strong>
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                  {availableCategories.map((cat) => (
                    <li key={cat.id}>
                      <strong>"{cat.slug}"</strong> (ID: {cat.id}, Name: {cat.name})
                      {cat.slug.toLowerCase() === CATEGORY_FILTER?.toString().toLowerCase() && (
                        <span style={{ color: '#667eea', marginLeft: '0.5rem' }}>← This matches!</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
              💡 Try using the category ID or exact slug from the list above, or set CATEGORY_FILTER to null to show all posts.
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

