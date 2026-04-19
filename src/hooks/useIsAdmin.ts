import { useEffect, useState } from 'react';

import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../utils/supabase';

/**
 * Hook to check whether the current user is an admin in the given community.
 * Queries the community_users table for the user's role.
 */
export const useIsAdmin = (communityId: string | undefined): boolean => {
  const { userId } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!userId || !communityId) {
      setIsAdmin(false);
      return;
    }

    let cancelled = false;

    supabase
      .from('community_users')
      .select('role')
      .eq('user_id', userId)
      .eq('community_id', communityId)
      .eq('status', 'ACCEPTED')
      .limit(1)
      .single()
      .then(({ data }) => {
        if (!cancelled) {
          setIsAdmin(data?.role === 'admin');
        }
      });

    return () => {
      cancelled = true;
    };
  }, [userId, communityId]);

  return isAdmin;
};
