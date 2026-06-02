import { ContactInfoSection, Divider, SocialMediaSection, InfoField } from '@/components/shared/ConductResearchView'
import { ResearchFunding } from '@/features/public/conduct-research/research-funding/types'

const FundingView = ({ data }: { data: ResearchFunding }) => (
    <div className="space-y-6">
        <ContactInfoSection mobile={data.mobile} whatsapp={data.whatsapp} />
        <Divider />
        <SocialMediaSection email={data.email} linkedin={data.linkedin} researchgate={data.researchgate} orcid={data.orcid} scholar={data.scholar} />
        <Divider />
        <InfoField label="Minor Research Area" value={data.minorResearchArea} />
        <Divider />
        <InfoField label="Contribution" value={data.howCanYouContribute} />
    </div>
)

export default FundingView