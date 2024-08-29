import { InfoCard, Body, Header, Details } from "@/components/info-card";
import LoadingPlaceholder from "@/components/loading-placeholder";
import InfoBox from "@/components/info-box";

export const Loading: React.FC = () => (
  <InfoCard>
    <Header>
      <LoadingPlaceholder w="xl" h="xl" />
      <Details>
        <LoadingPlaceholder w="xl" />
        <LoadingPlaceholder w="xl" h="lg" />
      </Details>
    </Header>

    <Body>
      <InfoBox<React.ReactNode>
        label={<LoadingPlaceholder w="sm" h="lg" />}
        value={<LoadingPlaceholder w="lg" h="xl" />}
        info={<LoadingPlaceholder w="md" h="sm" />}
        hover={false}
      />
      <InfoBox<React.ReactNode>
        label={<LoadingPlaceholder w="sm" h="lg" />}
        value={<LoadingPlaceholder w="lg" h="xl" />}
        hover={false}
      />
      <InfoBox<React.ReactNode>
        label={<LoadingPlaceholder w="sm" h="lg" />}
        value={<LoadingPlaceholder w="lg" h="xl" />}
        info={<LoadingPlaceholder w="md" h="sm" />}
        hover={false}
      />
      <InfoBox<React.ReactNode>
        label={<LoadingPlaceholder w="sm" h="lg" />}
        value={<LoadingPlaceholder w="lg" h="xl" />}
        info={<LoadingPlaceholder w="md" h="sm" />}
        hover={false}
      />
      <InfoBox<React.ReactNode>
        label={<LoadingPlaceholder w="sm" h="lg" />}
        value={<LoadingPlaceholder w="lg" h="xl" />}
        hover={false}
      />
    </Body>
  </InfoCard>
);
