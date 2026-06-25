import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata = buildPageMetadata({
  path: '/gear',
  title: 'Gear',
  description:
    'Software, hardware, and tools Ali Cagatay uses day to day: 14-inch MacBook Pro (M1 Pro), Dell and HP external displays, VS Code, Docker, Figma, Sony WH-1000XM5 headphones, and a Kindle Paperwhite.',
})

type GearTool = {
  title: string
  description: string
}

type GearSection = {
  title: string
  tools: GearTool[]
}

const sections: GearSection[] = [
  {
    title: 'Workstation',
    tools: [
      {
        title: '14” MacBook Pro, M1 Pro, 16GB RAM (2021)',
        description:
          'I was using an Intel-based 16” MacBook Pro prior to this and the difference is night and day. I’ve never heard the fans turn on a single time, even under incredibly heavy loads while working with extensive API calls and running several virtual machines via Docker.',
      },
      {
        title: 'Dell S Series S2421HSX 23.8”',
        description:
          'I use this display vertically while working on large codebases. It’s also great for reading long articles and documentation, and it helps while writing my Medium posts.',
      },
      {
        title: 'HP 24f Ultraslim Full HD Monitor 23.8”',
        description:
          'This is my main display for research, debugging, and watching videos during breaks, while I use my MacBook display for Slack and other communication tools.',
      },
    ],
  },
  {
    title: 'Development tools',
    tools: [
      {
        title: 'Visual Studio Code',
        description:
          'Even without all the fancy IDE features, VS Code is still my favorite editor. I’ve tried many tools over the years, but I always return to VS Code for speed, reliability, and extension support.',
      },
      {
        title: 'macOS Terminal',
        description:
          'It may not be the most powerful terminal emulator, but it has the features and customizations I need. I use it for local development, container workflows, and server operations.',
      },
      {
        title: 'Docker',
        description:
          'Docker lets me isolate project environments so dependencies don’t conflict. I use it heavily for reproducible local development and multi-service testing.',
      },
      {
        title: 'Postman',
        description:
          'I use Postman when I need to test APIs quickly by sending different request types and validating responses.',
      },
    ],
  },
  {
    title: 'Design',
    tools: [
      {
        title: 'Excalidraw',
        description:
          'I use Excalidraw for quick wireframes and architecture sketches. It’s simple, collaborative, and very fast for brainstorming.',
      },
      {
        title: 'Figma',
        description:
          'Figma is my go-to tool for UI design and interface prototyping.',
      },
      {
        title: 'Contrast',
        description:
          'I use Contrast to validate accessibility ratios between colors and quickly sample on-screen colors while designing.',
      },
    ],
  },
  {
    title: 'Productivity',
    tools: [
      {
        title: 'Google Calendar',
        description:
          'Google Calendar is my main tool for managing meetings, appointments, events, and tasks. I also use Google Workspace appointment scheduling to share my availability and simplify booking.',
      },
      {
        title: 'Google Drive',
        description:
          'Google Drive keeps my personal and work files organised, synced across devices, and available offline when needed.',
      },
      {
        title: 'Loom',
        description:
          'I use Loom to record screens, explain ideas asynchronously, and give detailed feedback without scheduling a meeting.',
      },
    ],
  },
  {
    title: 'Other Stuff',
    tools: [
      {
        title: 'Kindle Paperwhite',
        description:
          'The Kindle Paperwhite is one of my favorite devices for reading books and long-form content while traveling.',
      },
      {
        title: 'Sony WH-1000XM5 Noise Cancelling Wireless Headphones',
        description:
          'I use these for music, meetings, and focused work. They’re comfortable, sound great, and block noise effectively.',
      },
    ],
  },
]

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Card as="li">
      <Card.Title as="h3">{title}</Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export default function Gear() {
  return (
    <SimpleLayout
      title="Software I use, gadgets I love, and other things I recommend."
      intro="A list of the tools and gadgets I currently use to build, design and test software + the tools I currently use to stay productive all day + other random stuff that I just really like in my workflow."
    >
      <div className="space-y-20">
        {sections.map((section) => (
          <ToolsSection key={section.title} title={section.title}>
            {section.tools.map((tool) => (
              <Tool key={`${section.title}-${tool.title}`} title={tool.title}>
                {tool.description}
              </Tool>
            ))}
          </ToolsSection>
        ))}
      </div>
    </SimpleLayout>
  )
}
