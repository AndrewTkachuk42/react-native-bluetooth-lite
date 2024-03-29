import { useCallback, useState } from 'react';

import type { DeviceData, ScanOptions } from '../types/types';
import { useBluetooth } from './useBluetooth';

export const useScaner = (options?: ScanOptions) => {
  const { bluetooth } = useBluetooth();
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<DeviceData[]>([]);

  const scan = useCallback(async () => {
    const onDeviceFound = (newDevice: DeviceData) => {
      setDevices((deviceList) => [...deviceList, newDevice]);
    };

    setDevices([]);

    setIsScanning(true);
    const scanResult = await bluetooth.startScan(onDeviceFound, options);
    setIsScanning(false);

    return scanResult;
  }, [options, bluetooth]);

  return {
    scan,
    isScanning,
    devices,
  };
};
