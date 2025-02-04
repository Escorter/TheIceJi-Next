/* eslint-disable react-hooks/exhaustive-deps */
// import Link from 'next/link'
import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const NewNote = () => {
  const [form, setForm] = useState({ title: '', description: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const router = useRouter()

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        createNote()
      } else {
        setIsSubmitting(false)
      }
    }
  }, [errors])

  const createNote = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/notes', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
      console.log(res)
      router.push('/notes')
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let errs = validate()
    setErrors(errs)
    setIsSubmitting(true)
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const validate = () => {
    let err = {}

    if (!form.title) {
      err.title = 'Title is required'
    }
    if (!form.description) {
      err.description = 'Description is required'
    }

    return err
  }

  return (
    <div className='form-container'>
      <h1>Create Note</h1>
      <div>
        {isSubmitting ? (
          <h1>Loading...</h1>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              fluid
              error={
                errors.title
                  ? { content: 'Please enter a title', pointing: 'below' }
                  : null
              }
              label='Title'
              placeholder='Title'
              name='title'
              onChange={handleChange}
            />
            <textArea
              fluid
              label='Descriprtion'
              placeholder='Description'
              name='description'
              error={
                errors.description
                  ? { content: 'Please enter a description', pointing: 'below' }
                  : null
              }
              onChange={handleChange}
            />
            <button type='submit'>Create</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default NewNote
