import { useEffect } from 'react';
import { paths } from 'src/paths';

const LogoutBroadcast = () => {
  useEffect(() => {
  
    const broadcastChannel = new BroadcastChannel('logoutChannel');
    broadcastChannel.onmessage = function (event) {
      if (event.data === 'logout') {

        sessionStorage.clear();
        localStorage.removeItem('accessToken');
        window.location.href = paths.index;
      }
    };
  }, []);

  return null;
};

export default LogoutBroadcast;