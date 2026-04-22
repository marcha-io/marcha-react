import { useEffect, useMemo, useState } from 'react';

import { AVATAR_DEFAULT } from '../components/marketplace/constants';
import fetchFromStorage from '../utils/fetch_from_storage';

/**
 * Hook to get the user Avatar photo from the storage
 */
export const useUserAvatarUrl = (
  avatarPhoto: string | undefined | null
): string => {
  const [avatarBlob, setAvatarBlob] = useState<Blob | null>(null);

  useEffect(() => {
    if (avatarPhoto) {
      fetchFromStorage(avatarPhoto, `avatars`).then((blob) => {
        if (blob) setAvatarBlob(blob);
      });
    }
  }, [avatarPhoto]);

  return useMemo(
    () => (avatarBlob ? URL.createObjectURL(avatarBlob) : AVATAR_DEFAULT),
    [avatarBlob]
  );
};
