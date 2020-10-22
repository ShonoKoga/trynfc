import NfcManager, {APDU} from 'react-native-nfc-manager';
import {localizedString} from './readerError';

const commandHandler = async (apdu: APDU) => {
  const res = await NfcManager.sendCommandAPDUIOS(apdu);

  console.log(res);
  const {response, sw1, sw2} = res;

  if (sw1 !== 0x90 || sw2 !== 0x00) {
    const msg = localizedString(sw1, sw2);
    throw new Error(
      `[${msg}] sw1: ${sw1}, sw2: ${sw2}, APDU: ${JSON.stringify(apdu)}`,
    );
  }

  return response;
};

const selectDF = async () => {
  const res = await commandHandler({
    cla: 0x00,
    ins: 0xa4,
    p1: 0x04,
    p2: 0x0c,
    data: [0xd3, 0x92, 0x10, 0x00, 0x31, 0x00, 0x01, 0x01, 0x04, 0x08],
    le: -1,
  });

  return res;
};

const selectEF = async (data: number[]) => {
  const res = await commandHandler({
    cla: 0x00,
    ins: 0xa4,
    p1: 0x02,
    p2: 0x0c,
    data,
    le: -1,
  });

  return res;
};

const verify = async (pin: string) => {
  // TODO: pinをuint-8に変換後、16進数にする
  // 現状、ReactNative上でTextEncoderが動かない。ブラウザでは動く。
  // Array.from((new TextEncoder('utf-8')).encode(pin)).map(v => `0x${v.toString(16)}`)
  const data = pin;

  // const res = await commandHandler({
  //   cla: 0x00,
  //   ins: 0x20,
  //   p1: 0x00,
  //   p2: 0x80,
  //   data,
  //   le: -1,
  // });

  // return res;
};

const readBinary = async () => {
  const res = await commandHandler({
    cla: 0x00,
    ins: 0xb0,
    p1: 0x00,
    p2: 0x00,
    data: [],
    le: 17,
  });

  return res;
};

export default {
  selectDF,
  selectEF,
  verify,
  readBinary,
};
