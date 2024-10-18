import { type Metadata } from 'next'
import Image from 'next/image'
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import logoTimer from '@/images/logos/timer.svg'
import logoMetronome from '@/images/logos/metronome.svg'

function LinkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'Work With Me',
  description: 'Let’s work together to create something amazing.',
}

export default function Projects() {
  return (
    <SimpleLayout
      title="Let’s work together to create something amazing."
      intro="Do you have a minimum viable product (MVP) for a web or mobile application that needs to be completed soon? Or perhaps you have innovative designs for an app but need a skilled developer to bring them to life? Maybe you have a promising project idea for your business but lack the technical expertise to turn it into reality. If any of these situations sound familiar, I’m here to help. Book a call with me, and let’s have a detailed conversation about your vision and how I can support you in making it happen. During our session, we’ll dive into your specific needs and goals, allowing me to fully understand your project and how I can contribute to its success. Whether you’re finalising an MVP that requires quick development, transforming your designs into a live, functional product, or starting a new project from the ground up, I’ll work with you to craft a clear and efficient plan that ensures everything is on track for success. This consultation is an opportunity for us to connect, explore your ideas, and see how I can help bring your digital goals to life. When booking your time slot, please provide as much detail as possible so that we can have a productive and focused conversation. I’m excited to learn more about your project and look forward to helping you bring it to completion with dedication, expertise, and professionalism."
    >
      <div className="flex justify-center">
        <a
          href="https://calendar.app.google/kp9sapugpyAugvnQA"
          target="_blank"
          className="inline-flex items-center rounded-md border border-transparent bg-teal-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Schedule a meeting with me.
        </a>
      </div>
    </SimpleLayout>
  )
}
