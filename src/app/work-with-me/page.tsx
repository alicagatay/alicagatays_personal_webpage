import Link from '@/components/Link'
import { SimpleLayout } from '@/components/SimpleLayout'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata = buildPageMetadata({
  path: '/work-with-me',
  title: 'Work With Me',
  description:
    'Book a call with Ali Cagatay to discuss an MVP, mobile or web application development, or an AI-powered product idea.',
})

export default function WorkWithMe() {
  return (
    <SimpleLayout
      title="Let’s work together to create something amazing."
      intro="Do you have a minimum viable product (MVP) for a web or mobile application that needs to be completed soon? Or perhaps you have innovative designs for an app but need a skilled developer to bring them to life? Maybe you have a promising project idea for your business but lack the technical expertise to turn it into reality. If any of these situations sound familiar, I’m here to help. Book a call with me, and let’s have a detailed conversation about your vision and how I can support you in making it happen. During our session, we’ll dive into your specific needs and goals, allowing me to fully understand your project and how I can contribute to its success. Whether you’re finalising an MVP that requires quick development, transforming your designs into a live, functional product, or starting a new project from the ground up, I’ll work with you to craft a clear and efficient plan that ensures everything is on track for success. This consultation is an opportunity for us to connect, explore your ideas, and see how I can help bring your digital goals to life. When booking your time slot, please provide as much detail as possible so that we can have a productive and focused conversation. I’m excited to learn more about your project and look forward to helping you bring it to completion with dedication, expertise, and professionalism."
    >
      <div className="flex justify-center">
        <Link
          href="https://calendar.app.google/kp9sapugpyAugvnQA"
          className="inline-flex items-center rounded-md border border-transparent bg-teal-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Schedule a meeting with me.
        </Link>
      </div>
    </SimpleLayout>
  )
}
