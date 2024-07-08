// src/EnhancedNetworkChecker.js
import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

const EnhancedNetworkChecker = () => {
  const toast = useToast();

  const updateOnlineStatus = () => {
    const online = navigator.onLine;
    toast({
      title: online ? 'You are online' : 'You are offline',
      description: online ? 'You have regained internet connection.' : 'You have lost internet connection.',
      status: online ? 'success' : 'error',
      duration: online ? 3000 : null,
      isClosable: true,
      position: 'top',
    });
  };

  const updateBatteryStatus = (battery) => {
    const level = battery.level * 100;
    const charging = battery.charging;
    level <10 &&
    toast({
      title: charging ? 'Battery Charging' : 'Battery Discharging',
      description: `Battery level is at ${level.toFixed(0)}%.`,
      status: charging ? 'info' : level < 10 ? 'warning' : 'info',
      duration: 5000,
      isClosable: true,
      position:"bottom-right",
    });
  };

  useEffect(() => {
    // Network status monitoring
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Battery status monitoring
    if (navigator.getBattery) {
      navigator.getBattery().then((battery) => {
        const handleBatteryChange = () => updateBatteryStatus(battery);
        battery.addEventListener('chargingchange', handleBatteryChange);
        battery.addEventListener('levelchange', handleBatteryChange);

        return () => {
          battery.removeEventListener('chargingchange', handleBatteryChange);
          battery.removeEventListener('levelchange', handleBatteryChange);
        };
      });
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return null; // No need to render anything
};

export default EnhancedNetworkChecker;
