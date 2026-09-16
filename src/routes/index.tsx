import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const connectionString = process.env.DATABASE_URL || 'No connection string found'
  console.log('Connection String:', connectionString)
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Welcome to TanStack Start</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
        ConnectionString: {connectionString}
      </p>
    </div>
  )
}
