import { ContactInfoSection, Divider, SocialMediaSection, InfoField } from '@/components/shared/ConductResearchView'
import { ResearchIdea } from '@/features/public/conduct-research/research-idea/types'

const IdeaView = ({ data }: { data: ResearchIdea }) => (
    <div className="space-y-6">
        <ContactInfoSection mobile={data.mobile} whatsapp={data.whatsapp} />
        <Divider />
        <SocialMediaSection email={data.email} linkedin={data.linkedin} researchgate={data.researchgate} orcid={data.orcid} scholar={data.scholar} />
        <Divider />
        <div className="space-y-4">
            <InfoField label="Minor Research Area" value={data.minorResearchArea} />
            <InfoField label="Research Idea" value={data.researchIdea} />
        </div>
        <Divider />
        <InfoField label="Contribution" value={data.howCanYouContribute} />
    </div>
)

export default IdeaView