'use client'

import { useEffect, useState } from 'react'

const WORDPRESS_API_URL = '/api/wp'

interface Project {
  id: number
  title: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  link: string
  featured_media?: number
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        // Fetch projects from WordPress (you can change category later)
        const response = await fetch(`${WORDPRESS_API_URL}/posts?per_page=6&categories=43`)
        if (response.ok) {
          const data = await response.json()
          setProjects(data)
        }
      } catch (err) {
        console.error('Error fetching projects:', err)
        // Use placeholder projects if API fails
        setProjects([
          {
            id: 1,
            title: { rendered: 'Project Alpha' },
            excerpt: { rendered: 'A cutting-edge web application built with modern technologies.' },
            link: '#'
          },
          {
            id: 2,
            title: { rendered: 'Project Beta' },
            excerpt: { rendered: 'Mobile-first design system with component library.' },
            link: '#'
          },
          {
            id: 3,
            title: { rendered: 'Project Gamma' },
            excerpt: { rendered: 'Full-stack application with real-time features.' },
            link: '#'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#ffffff' }}>
      {/* Header */}
      <header style={{
        background: '#ffffff',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #b8d4e8',
        padding: '1.5rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#4a4a4a'
        }}>
          Paribesh Neupane
        </div>
        <nav style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'center'
        }}>
          <a href="#about" style={{ fontSize: '1rem', fontWeight: '500', transition: 'color 0.2s', color: '#333' }}>About</a>
          <a href="#projects" style={{ fontSize: '1rem', fontWeight: '500', transition: 'color 0.2s', color: '#333' }}>Projects</a>
          <a href="#contact" style={{ fontSize: '1rem', fontWeight: '500', transition: 'color 0.2s', color: '#333' }}>Contact</a>
          <a href="https://ish-vara.com" target="_blank" rel="noopener noreferrer" style={{
            fontSize: '1rem',
            fontWeight: '500',
            padding: '0.5rem 1.5rem',
            background: '#d0d0d0',
            borderRadius: '8px',
            color: '#555',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
          >Blog</a>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{
        flex: 1,
        padding: '3rem 2rem',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        background: '#ffffff'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Profile Section - Left 1/3 */}
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '2.5rem',
            border: '1px solid #b8d4e8',
            height: 'fit-content',
            position: 'sticky',
            top: '100px'
          }}>
            <div style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: '#c0c0c0',
              margin: '0 auto 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4rem',
              border: '2px solid #b8d4e8',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}>
              👤
            </div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '700',
              marginBottom: '0.5rem',
              textAlign: 'center',
              color: '#4a4a4a'
            }}>
              Paribesh Neupane
            </h1>
            <p style={{
              fontSize: '1.1rem',
              color: '#666',
              textAlign: 'center',
              marginBottom: '1.5rem',
              lineHeight: '1.6'
            }}>
              Full Stack Developer & Creative Problem Solver
            </p>
            <p style={{
              fontSize: '0.95rem',
              color: '#555',
              lineHeight: '1.8',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              Passionate about building innovative solutions and exploring the intersection of technology and creativity. 
              Always learning, always building, always pushing boundaries.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{
                padding: '0.6rem 1.2rem',
                background: '#d5d5d5',
                borderRadius: '8px',
                border: '1px solid #b8d4e8',
                fontSize: '0.9rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#c5c5c5'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#d5d5d5'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
              >GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{
                padding: '0.6rem 1.2rem',
                background: '#d5d5d5',
                borderRadius: '8px',
                border: '1px solid #b8d4e8',
                fontSize: '0.9rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#c5c5c5'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#d5d5d5'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
              >LinkedIn</a>
              <a href="mailto:contact@example.com" style={{
                padding: '0.6rem 1.2rem',
                background: '#d5d5d5',
                borderRadius: '8px',
                border: '1px solid #b8d4e8',
                fontSize: '0.9rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#c5c5c5'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#d5d5d5'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
              >Email</a>
            </div>
          </div>

          {/* Right Section - 2/3 width */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '3rem'
          }}>
            {/* Intro Section - Top Half */}
            <section id="about" style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '3rem',
              border: '1px solid #b8d4e8'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: '#4a4a4a'
              }}>
                Welcome
              </h2>
              <div style={{
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: '#555'
              }}>
                <p style={{ marginBottom: '1.5rem' }}>
                  I'm a passionate developer who loves turning complex problems into simple, beautiful, and intuitive solutions. 
                  With expertise in modern web technologies, I specialize in building scalable applications that deliver exceptional user experiences.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
                  or sharing knowledge through writing and mentoring. I believe in continuous learning and staying curious 
                  about the ever-evolving world of technology.
                </p>
                <p>
                  This website showcases my journey, projects, and thoughts. Feel free to explore and reach out if you'd 
                  like to collaborate or just have a conversation about tech, design, or anything interesting!
                </p>
              </div>
            </section>

            {/* Projects Section - Bottom Half */}
            <section id="projects" style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '3rem',
              border: '1px solid #b8d4e8'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '2rem',
                color: '#4a4a4a'
              }}>
                Featured Projects
              </h2>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
                  Loading projects...
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {projects.map((project) => (
                    <a
                      key={project.id}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: '#ffffff',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        border: '1px solid #b8d4e8',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        display: 'block'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)'
                        e.currentTarget.style.borderColor = '#9fc5e0'
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.borderColor = '#b8d4e8'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      <h3 style={{
                        fontSize: '1.3rem',
                        fontWeight: '600',
                        marginBottom: '0.75rem',
                        color: '#333'
                      }}>
                        {project.title.rendered}
                      </h3>
                      <div
                        dangerouslySetInnerHTML={{ __html: project.excerpt.rendered }}
                        style={{
                          color: '#555',
                          fontSize: '0.95rem',
                          lineHeight: '1.6'
                        }}
                      />
                      <div style={{
                        marginTop: '1rem',
                        fontSize: '0.85rem',
                        color: '#666',
                        fontWeight: '500'
                      }}>
                        View Project →
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer id="contact" style={{
        background: '#ffffff',
        borderTop: '1px solid #b8d4e8',
        padding: '3rem 2rem',
        marginTop: '0'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div>
            <div style={{
              fontSize: '1.3rem',
              fontWeight: '700',
              marginBottom: '0.5rem',
              color: '#4a4a4a'
            }}>
              Paribesh Neupane
            </div>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              Building the future, one line of code at a time.
            </p>
          </div>
          <div style={{
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{
              color: '#555',
              fontSize: '0.95rem',
              transition: 'color 0.2s'
            }}>GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{
              color: '#555',
              fontSize: '0.95rem',
              transition: 'color 0.2s'
            }}>LinkedIn</a>
            <a href="mailto:contact@example.com" style={{
              color: '#555',
              fontSize: '0.95rem',
              transition: 'color 0.2s'
            }}>Email</a>
            <a href="https://ish-vara.com" target="_blank" rel="noopener noreferrer" style={{
              color: '#555',
              fontSize: '0.95rem',
              transition: 'color 0.2s'
            }}>Blog</a>
          </div>
        </div>
        <div style={{
          marginTop: '2rem',
          paddingTop: '2rem',
          borderTop: '1px solid #b8d4e8',
          textAlign: 'center',
          color: '#666',
          fontSize: '0.85rem'
        }}>
          <p>© {new Date().getFullYear()} Paribesh Neupane. All rights reserved.</p>
          <p style={{ marginTop: '0.5rem' }}>Built with Next.js & WordPress</p>
        </div>
      </footer>
    </div>
  )
}
