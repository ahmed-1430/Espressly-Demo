import { ImageReveal } from "@/components/motion/image-reveal";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { statement } from "@/config/home";

/**
 * Brand statement.
 *
 * A full-bleed photographic band with a solid espresso plate pulled up across
 * its lower third. The plate carries the statement; the copy and pull quote
 * follow on paper. The overlap is the section's signature move and keeps every
 * word on a surface we control, so contrast never depends on the photograph.
 */
export function BrandStatement() {
  const lines = statement.headline.split(". ");

  return (
    <Section spacing="flush" tone="bright" className="pb-20 sm:pb-28 lg:pb-36">
      <div className="relative">
        <ParallaxImage
          image={statement.band}
          ratio="21 / 8"
          travel={60}
          sizes="100vw"
          reveal
          revealFrom="up"
          className="w-full"
          quality={78}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-950/70 via-transparent to-transparent"
        />

        <Container className="relative">
          <div className="-mt-[14%] w-full max-w-[54rem] bg-espresso-900 p-7 sm:-mt-[18%] sm:p-12 lg:-mt-[22%] lg:p-16">
            <Eyebrow tone="light">{statement.eyebrow}</Eyebrow>
            <h2 className="mt-6 text-display-2xs text-cream-100">
              {lines.map((line, index, all) => (
                <span key={line} className="block overflow-hidden pb-[0.05em]">
                  <SplitText
                    text={
                      index === all.length - 1 ? line : `${line.replace(/\.$/, "")}. `
                    }
                    delay={index * 0.1}
                  />
                </span>
              ))}
            </h2>
          </div>
        </Container>
      </div>

      <Container className="pt-14 sm:pt-20">
        <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <ImageReveal
              image={statement.band}
              from="left"
              ratio="3 / 4"
              sizes="(min-width: 1024px) 30vw, 92vw"
              className="w-full"
              quality={76}
            />
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={0.06}>
              <div className="flex flex-col gap-6 text-[1rem] leading-relaxed text-text-body sm:text-[1.0625rem]">
                {statement.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <blockquote className="mt-10 border-l border-copper-600 pl-6">
                <p className="text-[1.25rem] leading-snug display-type text-ink-900 sm:text-[1.5rem]">
                  “{statement.pullQuote}”
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href="/about" arrow>
                  Read our story
                </ButtonLink>
                <ButtonLink href="/what-we-offer" variant="outline">
                  What we offer
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}