import "./info-card.scss";

interface Base {
  className?: string;
  children?: React.ReactNode;
}

interface InfoCardProps extends Base {}

export const InfoCard: React.FC<InfoCardProps> = ({ children }) => {
  return <div className="info-card">{children}</div>;
};

export const Header: React.FC<Base> = ({ children }) => {
  return <header className="info-card__header">{children}</header>;
};

export const Title: React.FC<Base> = ({ children }) => {
  return <h1 className="info-card__header__title">{children}</h1>;
};

export const Details: React.FC<Base> = ({ children }) => {
  return <div className="info-card__header__details">{children}</div>;
};

export const Subtitle: React.FC<Base> = ({ children }) => {
  return <h2 className="info-card__header__details__subtitle">{children}</h2>;
};

export const Info: React.FC<Base> = ({ children }) => {
  return <p className="info-card__header__details__info">{children}</p>;
};

export const Body: React.FC<Base> = ({ children }) => {
  return <div className="info-card__info">{children}</div>;
};
