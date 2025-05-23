'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createBlog } from '@/services/blogService'
import TextEditor from '@/app/editor/TextEditor'

type BlogFormData = {
  title: string
  image: string
  isPublished: boolean
}

const CreateBlogForm = () => {
  const [content, setContent] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormData>()

  const onSubmit = async (data: BlogFormData) => {
    try {
      await createBlog({ ...data, content })
      alert('Blog created!')
      reset()
      setContent('')
    } catch {
      alert('Failed to create blog')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create New Blog</h2>

      <div>
        <label htmlFor="title" className="block mb-1 font-medium text-gray-700">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          {...register('title', { required: true })}
          placeholder="Enter blog title"
          className={`w-full rounded border px-4 py-3 focus:outline-none focus:ring-2 ${
            errors.title ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.title && <p className="text-red-600 mt-1 text-sm">Title is required</p>}
      </div>

      <div>
        <label htmlFor="image" className="block mb-1 font-medium text-gray-700">
          Image URL <span className="text-red-500">*</span>
        </label>
        <input
          id="image"
          {...register('image', { required: true })}
          placeholder="Enter image URL"
          className={`w-full rounded border px-4 py-3 focus:outline-none focus:ring-2 ${
            errors.image ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.image && <p className="text-red-600 mt-1 text-sm">Image is required</p>}
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">Content</label>
        <TextEditor content={content} onChange={setContent} />
      </div>

      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="isPublished"
          {...register('isPublished')}
          defaultChecked
          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="isPublished" className="text-gray-700 font-medium cursor-pointer">
          Publish
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Create Blog'}
      </button>
    </form>
  )
}

export default CreateBlogForm
