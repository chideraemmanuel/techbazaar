const b64_table =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

const keyCharAt = (key: string, i: number) => {
  return key.charCodeAt(Math.floor(i % key.length));
};

const xor_encrypt = (key: string, data: string) => {
  const res = data.split('').map((c, i) => {
    return c.charCodeAt(0) ^ keyCharAt(key, i);
  });

  return res;
};

const xor_decrypt = (key: string, data: number[] | null) => {
  if (!data) return null;

  const res = data
    .map((c, i) => {
      return String.fromCharCode(c ^ keyCharAt(key, i));
    })
    .join('');

  return res;
};

const b64_encode = (data: number[]) => {
  let o1,
    o2,
    o3,
    h1,
    h2,
    h3,
    h4,
    bits,
    r,
    i = 0,
    enc = '';

  //   if (!data) return data;
  if (!data) return null;

  do {
    o1 = data[i++];
    o2 = data[i++];
    o3 = data[i++];
    bits = (o1 << 16) | (o2 << 8) | o3;
    h1 = (bits >> 18) & 0x3f;
    h2 = (bits >> 12) & 0x3f;
    h3 = (bits >> 6) & 0x3f;
    h4 = bits & 0x3f;
    enc +=
      b64_table.charAt(h1) +
      b64_table.charAt(h2) +
      b64_table.charAt(h3) +
      b64_table.charAt(h4);
  } while (i < data.length);

  r = data.length % 3;

  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
};

const b64_decode = (data: string | null) => {
  let o1,
    o2,
    o3,
    h1,
    h2,
    h3,
    h4,
    bits,
    i = 0,
    result = [];

  //   if (!data) return data;
  if (!data) return null;

  do {
    h1 = b64_table.indexOf(data.charAt(i++));
    h2 = b64_table.indexOf(data.charAt(i++));
    h3 = b64_table.indexOf(data.charAt(i++));
    h4 = b64_table.indexOf(data.charAt(i++));
    bits = (h1 << 18) | (h2 << 12) | (h3 << 6) | h4;
    o1 = (bits >> 16) & 0xff;
    o2 = (bits >> 8) & 0xff;
    o3 = bits & 0xff;
    result.push(o1);
    if (h3 !== 64) {
      result.push(o2);
      if (h4 !== 64) {
        result.push(o3);
      }
    }
  } while (i < data.length);

  return result;
};

export const encode = (key: string, data: string) => {
  const encr = xor_encrypt(key, data);
  return b64_encode(encr);
};

export const decode = (key: string, data: string | null) => {
  const dec = b64_decode(data);
  return xor_decrypt(key, dec);
};

// const key = '123';

// console.log(encode('test', '123456'));
// console.log(decode('test', 'RVdAQEFT'));

// Encrypt the text
// const encryptedText = encode(key, '123456');
// console.log('Encrypted Text:', encryptedText);

// Decrypt the text
// const decryptedText = decode(key, encryptedText);
// console.log('Decrypted Text:', decryptedText);
