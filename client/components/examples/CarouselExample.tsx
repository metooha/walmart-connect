import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card } from '@/components/ui/Card';

const sampleCards = [
  { title: 'Getting Started', description: 'Learn the basics of our platform and set up your first campaign.' },
  { title: 'Performance', description: 'Track your campaign metrics and optimize for better results.' },
  { title: 'Analytics', description: 'Dive deep into data insights and reporting dashboards.' },
  { title: 'Integrations', description: 'Connect with third-party tools and services seamlessly.' },
  { title: 'Settings', description: 'Configure your account preferences and team access.' },
  { title: 'Resources', description: 'Access documentation, guides, and support materials.' },
];

function SampleCard({ title, description }: { title: string; description: string }) {
  return (
    <Card size="small" UNSAFE_style={{ height: '100%' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '16px',
      }}>
        <h4 style={{
          fontSize: '16px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text, #2e2f32)',
          margin: 0,
        }}>
          {title}
        </h4>
        <p style={{
          fontSize: '14px',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-subtle, #515357)',
          margin: 0,
          lineHeight: '20px',
        }}>
          {description}
        </p>
      </div>
    </Card>
  );
}

export default function CarouselExample() {
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '16px'
        }}>
          Basic Carousel
        </h3>
        <Carousel className="w-full max-w-sm mx-auto">
          <CarouselContent>
            {sampleCards.map((card, index) => (
              <CarouselItem key={index}>
                <div className="p-1 h-full">
                  <SampleCard title={card.title} description={card.description} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '16px'
        }}>
          Multiple Items
        </h3>
        <Carousel className="w-full max-w-2xl mx-auto">
          <CarouselContent className="-ml-1">
            {sampleCards.map((card, index) => (
              <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <SampleCard title={card.title} description={card.description} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </div>
  );
}
