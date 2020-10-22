import {useEffect} from 'react';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';

const useNfc = () => {
  useEffect(() => {
    NfcManager.start();

    return () => cleanUp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cleanUp = () => {
    NfcManager.unregisterTagEvent().catch(() => 0);
  };

  const handleReadNfc = async () => {
    try {
      let tech = [NfcTech.IsoDep];

      await NfcManager.requestTechnology(tech, {
        alertMessage: 'Ready to detect technology',
      });

      // the NFC uid can be found in tag.id
      let tag = await NfcManager.getTag();
      console.warn(tag);

      cleanUp();
    } catch (ex) {
      console.warn('ex', ex);
      cleanUp();
    }
  };

  return {
    handleReadNfc,
    cleanUp,
  };
};

export default useNfc;
