import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

import { invalidateRelayStore } from '../../lib/relay_environment';
import { supabase } from '../../lib/supabase';
import { Paths } from '../../views/paths';

type Props = {
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

function LogOutNavbar({ setIsUserLoggedIn }: Props): React.ReactElement {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const logOut = () => {
    supabase.auth.signOut().then(({ error }) => {
      if (error != null) {
        api.error({
          title: `(${error.name}) Failed to log out`,
          description: error.message,
          duration: 5,
          pauseOnHover: true,
        });
        return;
      }

      api.success({
        title: 'You have logged out',
        duration: 2,
        pauseOnHover: false,
      });

      invalidateRelayStore();
      setIsUserLoggedIn(false);
      navigate(Paths.Main);
    });
  };

  return (
    <>
      {contextHolder}
      <div rel="noopener noreferrer" onClick={logOut}>
        Log out
      </div>
    </>
  );
}

export default LogOutNavbar;
