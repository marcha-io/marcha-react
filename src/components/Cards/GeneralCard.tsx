import { Avatar, Card } from 'antd';

const { Meta } = Card;

type Props = {
  name: string;
  description: string;
  imageBlob: Blob;
  width?: number;
  height?: number;
  imgHeight?: number;
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
  width = 300,
  height = 350,
  imgHeight = 250,
  avatarBlob,
  onClick,
  hoverable = true,
  hasAvatar = true,
}: Props): React.ReactElement => {
  return (
    <Card
      hoverable={hoverable}
      style={{ width: width, height: height }}
      cover={
        <img
          height={imgHeight}
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
