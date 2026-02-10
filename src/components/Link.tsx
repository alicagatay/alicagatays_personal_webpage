import NextLink from 'next/link'

type LinkProps = React.ComponentPropsWithoutRef<typeof NextLink>

type HrefKind = 'internal' | 'http-external' | 'protocol-external'

function getHrefKind(href: LinkProps['href']): HrefKind {
  if (typeof href !== 'string') {
    return 'internal'
  }

  if (href.startsWith('/') || href.startsWith('#')) {
    return 'internal'
  }

  if (/^https?:\/\//.test(href)) {
    return 'http-external'
  }

  if (/^(mailto:|tel:)/.test(href)) {
    return 'protocol-external'
  }

  return 'http-external'
}

export default function Link({ href, rel, target, ...props }: LinkProps) {
  const hrefKind = getHrefKind(href)
  const isExternal = hrefKind !== 'internal'
  const shouldOpenNewTab = hrefKind === 'http-external'
  const resolvedTarget = target ?? (shouldOpenNewTab ? '_blank' : undefined)
  const resolvedRel =
    rel ?? (shouldOpenNewTab ? 'noopener noreferrer' : undefined)

  if (isExternal && typeof href === 'string') {
    return (
      <a
        href={href}
        target={resolvedTarget}
        rel={resolvedRel}
        {...(props as React.ComponentPropsWithoutRef<'a'>)}
      />
    )
  }

  return (
    <NextLink
      href={href}
      target={resolvedTarget}
      rel={resolvedRel}
      {...props}
    />
  )
}
