import Image from 'next/image';

import { urlFor } from '@/lib/sanity-image';

/* ── Types from Sanity Portable Text ──────────────────────────────────── */

type Mark = {
  _key: string;
  _type: string;
  href?: string;
  blank?: boolean;
  rel?: string;
};

type Span = {
  _type: 'span';
  text: string;
  marks: string[];
};

type Block = {
  _key: string;
  _type: 'block' | 'image';
  style?: string;
  listItem?: string;
  children?: Span[];
  markDefs?: Mark[];
  level?: number;
  asset?: { _ref: string };
  alt?: string;
  caption?: string;
};

/* ── Inline renderer for a single span ───────────────────────────────── */

function renderSpan(span: Span, markDefs: Mark[]) {
  let content: React.ReactNode = span.text;

  for (const markKey of span.marks) {
    if (markKey === 'strong') {
      content = <strong key={markKey}>{content}</strong>;
    } else if (markKey === 'em') {
      content = <em key={markKey}>{content}</em>;
    } else if (markKey === 'underline') {
      content = <u key={markKey}>{content}</u>;
    } else {
      const def = markDefs.find((m) => m._key === markKey);
      if (def?._type === 'link' && def.href) {
        const rel = [def.blank ? 'noopener noreferrer' : '', def.rel ?? '']
          .filter(Boolean)
          .join(' ');
        content = (
          <a
            key={markKey}
            href={def.href}
            target={def.blank ? '_blank' : undefined}
            rel={rel || undefined}
            className="text-primary underline underline-offset-2 hover:text-primary-hover transition-colors"
          >
            {content}
          </a>
        );
      }
    }
  }

  return content;
}

/* ── Inline block (paragraph / heading / quote) ───────────────────────── */

function renderBlock(block: Block, index: number) {
  const markDefs = block.markDefs ?? [];
  const children = (block.children ?? []).map((span, i) => (
    <span key={i}>{renderSpan(span, markDefs as Mark[])}</span>
  ));

  switch (block.style) {
    case 'h2':
      return (
        <h2
          key={block._key}
          id={`h-${index}`}
          className="font-serif text-display-md text-charcoal-700 font-light mt-12 mb-5 leading-snug"
        >
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3
          key={block._key}
          className="font-serif text-2xl text-charcoal-700 font-light mt-10 mb-4 leading-snug"
        >
          {children}
        </h3>
      );
    case 'h4':
      return (
        <h4
          key={block._key}
          className="font-serif text-xl text-charcoal-700 font-light mt-8 mb-3"
        >
          {children}
        </h4>
      );
    case 'blockquote':
      return (
        <blockquote
          key={block._key}
          className="my-8 pl-6 border-l-2 border-gold italic font-serif text-xl text-charcoal-500 leading-relaxed"
        >
          {children}
        </blockquote>
      );
    default:
      return (
        <p
          key={block._key}
          className="text-body-md text-charcoal-600 leading-relaxed mb-5"
        >
          {children}
        </p>
      );
  }
}

/* ── Inline image ─────────────────────────────────────────────────────── */

function renderImage(block: Block) {
  if (!block.asset?._ref) return null;
  const src = urlFor(block).width(1200).quality(85).url();
  return (
    <figure key={block._key} className="my-10">
      <div className="relative w-full overflow-hidden rounded-sm">
        <Image
          src={src}
          alt={block.alt ?? ''}
          width={1200}
          height={675}
          className="w-full h-auto object-cover"
          quality={85}
        />
      </div>
      {block.caption && (
        <figcaption className="mt-3 text-center text-sm text-charcoal-400 italic">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ── List grouping ────────────────────────────────────────────────────── */

type ListGroup = {
  listItem: 'bullet' | 'number';
  level: number;
  items: Block[];
};

function groupLists(blocks: Block[]): Array<Block | ListGroup> {
  const result: Array<Block | ListGroup> = [];
  let currentGroup: ListGroup | null = null;

  for (const block of blocks) {
    if (block._type === 'block' && block.listItem) {
      if (
        currentGroup &&
        currentGroup.listItem === block.listItem &&
        currentGroup.level === (block.level ?? 1)
      ) {
        currentGroup.items.push(block);
      } else {
        currentGroup = {
          listItem: block.listItem as 'bullet' | 'number',
          level: block.level ?? 1,
          items: [block],
        };
        result.push(currentGroup);
      }
    } else {
      currentGroup = null;
      result.push(block);
    }
  }

  return result;
}

/* ── Root export ──────────────────────────────────────────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PortableText({ value }: { value: any[] }) {
  if (!value?.length) return null;

  const grouped = groupLists(value as Block[]);

  return (
    <div className="prose-blog">
      {grouped.map((item, index) => {
        if ('items' in item) {
          const Tag = item.listItem === 'number' ? 'ol' : 'ul';
          return (
            <Tag
              key={index}
              className={`my-6 ml-6 space-y-2 text-body-md text-charcoal-600 ${
                item.listItem === 'number' ? 'list-decimal' : 'list-disc'
              }`}
            >
              {item.items.map((li: Block) => {
                const markDefs = li.markDefs ?? [];
                return (
                  <li key={li._key} className="leading-relaxed">
                    {(li.children ?? []).map((span: Span, i: number) => (
                      <span key={i}>
                        {renderSpan(span, markDefs as Mark[])}
                      </span>
                    ))}
                  </li>
                );
              })}
            </Tag>
          );
        }

        const block = item as Block;
        if (block._type === 'image') return renderImage(block);
        return renderBlock(block, index);
      })}
    </div>
  );
}
