import {useEffect} from 'react';
import {Platform} from 'react-native';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import reader from './IndividualNumberReader';

const useNfc = () => {
  useEffect(() => {
    NfcManager.start();

    return () => cleanUp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cleanUp = () => {
    NfcManager.cancelTechnologyRequest().catch(() => 0);
  };

  const handleReadNfc = async () => {
    try {
      const tech = NfcTech.IsoDep;

      await NfcManager.requestTechnology(tech, {
        alertMessage: 'Ready to detect technology',
      });

      // the NFC uid can be found in tag.id
      let tag = await NfcManager.getTag();
      console.warn('tag', tag);

      if (Platform.OS === 'ios') {
        // 券面AP を選択
        await reader.selectDF();

        // ファイルを選択
        await reader.selectEF([0x00, 0x11]);

        // PIN認証
        const PIN = '自分のPINコードを入力する';
        await reader.verify(PIN);

        // ファイルを選択
        await reader.selectEF([0x00, 0x01]);

        // データ取得
        await reader.readBinary();

        console.log('読み取り完了！');
      } else {
        console.log('Android');
      }

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
