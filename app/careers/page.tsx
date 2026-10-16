import EnquiryPage from '@/components/EnquiryPage'

export const metadata = { title: 'Careers | Veechelz Nigeria Limited' }

export default function Page() {
  return (
    <EnquiryPage
      kicker="Careers"
      title="Build beautiful interiors with us"
      intro="We're always happy to meet skilled people. Tell us about yourself and the work you do, and we'll be in touch when there's a fit."
      tag="Careers"
      messageLabel="Tell us about yourself"
      messagePlaceholder="The role you're interested in, your experience, and where you're based."
      waText="I'm interested in working with Veechelz"
      highlights={[
        { title: 'Installers & fitters', text: 'Experience with blinds, curtains or interior finishing is a plus.' },
        { title: 'Sales & design', text: 'Help clients choose the right solutions for their space.' },
        { title: 'Operations', text: 'Support surveys, logistics and delivery across our cities.' },
      ]}
    />
  )
}
