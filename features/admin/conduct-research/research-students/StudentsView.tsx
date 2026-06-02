import { ContactInfoSection, Divider, InfoField, SocialMediaSection } from '@/components/shared/ConductResearchView'
import { ResearchStudents } from '@/features/public/conduct-research/research-students/types'

const StudentsView = ({ data }: { data: ResearchStudents }) => (
    <div className="space-y-6">
        <ContactInfoSection mobile={data.mobile} whatsapp={data.whatsapp} />
        <Divider />
        <SocialMediaSection email={data.email} linkedin={data.linkedin} researchgate={data.researchgate} orcid={data.orcid} scholar={data.scholar} />
        <Divider />
        <InfoField label="Minor Research Area" value={data.minorResearchArea} />
        <Divider />
        <InfoField label="Conduct Research Location" value={data.whereWouldYouLikeToConductResearch} />
    </div>
)

export default StudentsView