import EnquiryPage from '@/components/EnquiryPage'

export const metadata = { title: 'Press & Media | Veechelz Nigeria Limited' }

export default function Page() {
  return (
    <EnquiryPage
      kicker="Press & Media"
      title="Let's tell the Veechelz story"
      intro="Writing about interiors, design or business in Nigeria? We'd love to talk. Reach out for interviews, features, project images or partnerships."
      tag="Press & Media"
      messageLabel="How can we help?"
      messagePlaceholder="Tell us about your publication, the story you're working on, and your deadline."
      waText="I'd like to make a press enquiry"
      highlights={[
        { title: 'Interviews & features', text: 'Talk to the team about made-to-measure blinds and Nigerian interiors.' },
        { title: 'Project images', text: 'Ask for photos of our installations across Abuja, Lagos and Port Harcourt.' },
        { title: 'Partnerships', text: 'Collaborations with designers, developers and brands are welcome.' },
      ]}
    />
  )
}
