import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import App from '@/App'
import { en } from '@/i18n/en'
import { getPosts } from '@/lib/posts'

function renderAt(path: string) {
  window.history.pushState({}, '', path)
  return render(<App />)
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.lang = 'en'
})

describe('routing', () => {
  it('renders the landing page at /', async () => {
    renderAt('/')
    expect(await screen.findByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders the blog index at /blog with every post listed', async () => {
    renderAt('/blog')
    for (const post of getPosts('en')) {
      expect(await screen.findByRole('heading', { name: post.title })).toBeInTheDocument()
    }
  })

  it('renders a post at /blog/:slug with its markdown body as HTML', async () => {
    const post = getPosts('en')[0]
    renderAt(`/blog/${post.slug}`)
    expect(await screen.findByRole('heading', { level: 1, name: post.title })).toBeInTheDocument()
    // marked turns `##` headings into real h2 elements, so the body rendered.
    expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThan(0)
  })

  it('shows the post-not-found state for an unknown slug', async () => {
    renderAt('/blog/does-not-exist')
    expect(await screen.findByRole('link', { name: en.blog.backToBlog })).toBeInTheDocument()
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
  })

  it('renders the about page at /about with every anchor the navbar targets', async () => {
    renderAt('/about')
    await screen.findByRole('heading', { level: 2, name: en.about.title })
    for (const id of ['about', 'skills', 'experience', 'mobile', 'contact']) {
      expect(document.getElementById(id), `#${id} missing`).not.toBeNull()
    }
  })

  it('renders the 404 page for an unknown route', async () => {
    renderAt('/nope')
    expect(await screen.findByText('404')).toBeInTheDocument()
  })

  it('navigates from the landing page to the blog via the navbar', async () => {
    const user = userEvent.setup()
    renderAt('/')
    const nav = screen.getByRole('navigation', { name: /main/i })
    await user.click(within(nav).getByRole('link', { name: /writing/i }))
    expect(await screen.findByRole('heading', { name: getPosts('en')[0].title })).toBeInTheDocument()
  })

  it('navigates from the blog index into a post and back', async () => {
    const user = userEvent.setup()
    const post = getPosts('en')[0]
    renderAt('/blog')
    await user.click(await screen.findByRole('heading', { name: post.title }))
    expect(await screen.findByRole('heading', { level: 1, name: post.title })).toBeInTheDocument()
    await user.click(screen.getAllByRole('link', { name: en.blog.backToBlog })[0])
    expect(await screen.findByRole('heading', { level: 1, name: en.blog.title })).toBeInTheDocument()
  })

  it('marks the current route with aria-current on the navbar link', async () => {
    renderAt('/blog')
    const nav = screen.getByRole('navigation', { name: /main/i })
    const active = within(nav).getByRole('link', { name: /writing/i })
    expect(active).toHaveAttribute('aria-current', 'page')
    expect(within(nav).getByRole('link', { name: /^about$/i })).not.toHaveAttribute('aria-current')
  })

  it('offers a skip link as the first focusable element', async () => {
    renderAt('/')
    const skip = screen.getByRole('link', { name: /skip to main content/i })
    expect(skip).toHaveAttribute('href', '#main-content')
    expect(document.getElementById('main-content')).not.toBeNull()
  })
})
