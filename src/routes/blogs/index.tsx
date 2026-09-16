import BlogList from '#/components/BlogList'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blogs/')({
  component: BlogList
})


