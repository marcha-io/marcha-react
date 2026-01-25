import { Avatar, Card } from 'antd';

const { Meta } = Card;

type Props = {
  name: string;
  description: string;
  imageBlob: Blob;
  onClick: () => void;
  hasAvatar?: boolean;
  avatarBlob?: Blob | null;
  hoverable?: boolean;
};

const AVATAR_DEFAULT = 'https://api.dicebear.com/7.x/miniavs/svg?seed=8';

const GeneralCard = ({
  name,
  description,
  imageBlob,
  avatarBlob,
  onClick,
  hoverable = true,
  hasAvatar = true,
}: Props): React.ReactElement => {
  return (
    <Card
      hoverable={hoverable}
      style={{ width: 300, height: 350 }}
      cover={
        <img
          height={250}
          alt={name}
          src={imageBlob ? URL.createObjectURL(imageBlob) : ''}
        />
      }
      onClick={onClick}
    >
      <Meta
        avatar={
          hasAvatar && (
            <Avatar
              src={
                avatarBlob ? URL.createObjectURL(avatarBlob) : AVATAR_DEFAULT
              }
            />
          )
        }
        title={name}
        description={description}
      />
    </Card>
  );
};

export default GeneralCard;
