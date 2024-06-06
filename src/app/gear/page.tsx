import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

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
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export const metadata = {
  title: 'My Gear',
  description: 'Software I use, gadgets I love, and other things I recommend.',
}

export default function Uses() {
  return (
    <SimpleLayout
      title="Software I use, gadgets I love, and other things I recommend."
      intro="A list of the tools and gadgets I currently use to build, design and test software + the tools I currently use to stay productive all day + other random stuff that I just really like in my workflow."
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title="14” MacBook Pro, M1 Pro, 16GB RAM (2021)">
            I was using an Intel-based 16” MacBook Pro prior to this and the
            difference is night and day. I’ve never heard the fans turn on a a
            single time, even under the incredibly heavy loads I put it through
            while working with extensive API calls and while running several
            virtual machines via Docker.
          </Tool>
          <Tool title="Dell S Series S2421HSX 23.8” ">
            I use this display vertically all the time while working on large
            codebases. It’s also great for reading long articles, documentation,
            and it also helps while writing my articles on Medium.
          </Tool>
          <Tool title="HP 24f Ultraslim Full HD Monitor 23.8”">
            This is the main display I use while doing research for my articles,
            debugging my code, and watching videos on my free time as I use my
            main MacBook computer for messaging in Slack and other communication
            apps.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Development tools">
          <Tool title="Visual Studio Code">
            I don’t care if it’s missing all of the fancy IDE features everyone
            else relies on, Visual Studio Code is still the best text editor
            ever made. I’ve tried so many tools over the years such as Atom,
            other JetBrains IDE’s, Sublime Text, and even Vim and Neovim but I
            always come back to VS Code. It’s just so fast and reliable, and it
            has loads of extensions, where you can power it up with any feature
            you want.
          </Tool>
          <Tool title="macOS Terminal">
            It is not the most powerful terminal emulator out there, but it has
            all the features and customizations I need. I use it for everything
            from running my local development environment to managing my
            servers. It also looks very nice and clean, which I like a lot.
          </Tool>
          <Tool title="Docker">
            As a software engineer, I work with a lot of different projects,
            which requires the usage of different programming languages,
            frameworks and tools. And most of the time, it is common that these
            tools will break other tools in other projects, which is a huge
            pain. Docker solves this problem by allowing me to create isolated
            development environments for each project, where I can install any
            tool I need without having to worry about breaking other projects. I
            also use it to run my local development environment, which is very
            convenient.
          </Tool>
          <Tool title="Postman">
            I use Postman whenever I need to test a server or an API by sending
            different kind of web requests, whether it is mine or someone
            else’s.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Design">
          <Tool title="Excalidraw">
            I use Excalidraw for all of my wireframing and prototyping work.
            It’s easily the best tool I’ve ever used for this purpose. It also
            has a very easy learning curve and it’s free. Also, it has a great
            community of users and developers, which is always a plus.
          </Tool>
          <Tool title="Figma">
            I use Figma for all of my UI design work. It’s a great tool for
            designing user interfaces, and it also has a great community of
            users and developers, which is always a plus.
          </Tool>
          <Tool title="Contrast">
            Whenever I need to check the contrast between two colors, I use this
            tool to see if their contrast ratio is high enough to be accessible
            for the end user. I also use this tool to find the color I see on
            the screen.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Productivity">
          <Tool title="Google Calendar">
            I rely on Google Calendar as my primary tool to manage and keep
            track of all my meetings, appointments, events, and tasks. It is an
            extremely user-friendly and reliable system that effectively gets
            the job done without any complications. One of the reasons I find
            Google Calendar so useful is its simplicity; it&apos;s
            straightforward and easy to use, helping me to avoid any scheduling
            conflicts and ensuring that I&apos;m always well-prepared for the
            day ahead. In addition to this, I also have a Google Workspace
            subscription. This service provides a plethora of additional
            benefits, one of which is the ability to create appointment
            schedules directly from my calendar. I can easily prepare these
            schedules and share them with colleagues, clients, or anyone else
            who may need to book a meeting with me. This feature makes it
            incredibly easy for others to see my availability and schedule a
            time that works for both of us, streamlining the entire process and
            making scheduling meetings a breeze.
          </Tool>
          <Tool title="Google Drive">
            Google Drive is an essential tool that keeps both my work and
            personal life organised. I use it to store all my work-related
            documents, spreadsheets, presentations, and personal files like
            photos and videos. It also serves as a central hub for creating and
            managing project files, brainstorming and drafting Medium blog posts
            and collaborating with colleagues on shared documents. The ability
            to access my files from any device, anywhere, is incredibly
            convenient and significantly boosts my productivity. Additionally,
            its desktop app allows me to access files offline, which is very
            convenient in places with bad connections or while travelling. This
            flexibility allows me to seamlessly transition between my desktop,
            laptop, and mobile devices, ensuring I can access important
            documents and information whenever necessary.
          </Tool>
          <Tool title="Loom">
            I use Loom to record my screen and share it with other people. It’s
            a great tool for recording video tutorials and for giving feedback
            on other people’s work without the need of scheduling and attending
            a meeting.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Other Stuff">
          <Tool title="Kindle Paperwhite">
            Kindle’s Paperwhite edition is one of the best gadgets I’ve ever
            purchased. I use it to read books, articles, and even my own
            articles. It’s just so convenient to have all my reading material in
            one place, and it’s also very easy to carry around while travelling.
          </Tool>
          <Tool title="Sony WH-1000XM5 Noise Cancelling Wireless Headphones">
            I use these headphones to listen to music, watch videos, and to
            attend meetings. They are just so comfortable and the sound quality
            is amazing. I also use them to block out any noise while I’m
            travelling or working in a noisy environment.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
