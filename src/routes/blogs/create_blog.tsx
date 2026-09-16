import { useForm } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

const formSchema = z.object({
  date: z.iso.datetime(),
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  isPublished: z.boolean(),
  isApproved: z.boolean(),
})

export const Route = createFileRoute('/blogs/create_blog')({
  component: CreateBlogPage,
})

function CreateBlogPage() {
  const { Field, handleSubmit } = useForm({
    defaultValues: {
      date: new Date().toISOString(),
      title: '',
      content: '',
      isPublished: false,
      isApproved: false,
    },
    onSubmit: async ({ value }) => {
      console.log(value)
    },
    validators: {
      onSubmit: formSchema,
      onBlur: formSchema,
    },
  })

  return (
    <div className="flex items-center justify-center ">
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <Field name="date">
          {field => {
            const { errors } = field.state.meta

            return (
              <>
                <input
                  className="border-2 border-black"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Jane"
                />
                {errors.length > 0 && <span className="text-red-500">{errors[0]?.message}</span>}
              </>
            )
          }}
        </Field>

        <Field name="title">
          {field => {
            const { errors } = field.state.meta

            return (
              <>
                <input
                  className="border-2 border-black"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Blog Title"
                />
                {errors.length > 0 && <span className="text-red-500">{errors[0]?.message}</span>}
              </>
            )
          }}
        </Field>

        <Field name="content">
          {field => {
            const { errors } = field.state.meta

            return (
              <>
                <textarea
                  className="border-2 border-black"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Blog Content"
                  rows={5}
                  cols={30}
                />
                {errors.length > 0 && <span className="text-red-500">{errors[0]?.message}</span>}
              </>
            )
          }}
        </Field>

        <Field name="isPublished">
          {field => {
            const { errors } = field.state.meta

            return (
              <>
                <label>
                  <input
                    type="checkbox"
                    checked={field.state.value}
                    onChange={(e) => field.handleChange(e.target.checked)}
                  />
                  Published
                </label>
                {errors.length > 0 && <span className="text-red-500">{errors[0]?.message}</span>}
              </>
            )
          }}
        </Field>

        <Field name="isApproved">
          {field => {
            const { errors } = field.state.meta

            return (
              <>
                <label>
                  <input
                    type="checkbox"
                    checked={field.state.value}
                    onChange={(e) => field.handleChange(e.target.checked)}
                  />
                  Approved
                </label>
                {errors.length > 0 && <span className="text-red-500">{errors[0]?.message}</span>}
              </>
            )
          }}
        </Field>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  )
}

