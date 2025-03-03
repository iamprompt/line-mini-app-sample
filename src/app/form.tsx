'use client'

import liff from '@line/liff'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export const FormClient = () => {
  const form = useForm({
    defaultValues: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log(data)

    const liffAccessToken = liff.getAccessToken()

    if (!liffAccessToken) {
      console.error('LIFF access token is required')
      return
    }

    // Send the form data to the server
    await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-liff-access-token': liffAccessToken,
      },
      body: JSON.stringify(data),
    })
  })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="cursor-pointer disabled:pointer-events-none"
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}
