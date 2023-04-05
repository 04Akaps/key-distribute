import Web3 from "web3";

import ss from "secrets.js-grempe";
import crypto from "crypto";

const shares = 6;
const threshold = 4;

const INFURA_URL =
  "https://mainnet.infura.io/v3/a9bb27c0b15f4c9590eaa7d964dffe8f";
// Test용으로 그냥 선언

const PASSWORD: string = "PASSWORD"; // dummyPassword
const SALT: string = "SALT";
const ITERATIONS = 100000;
const KEYLEN = 32;
const DIGEST = "sha256";

export const getWeb3Instance = (): Web3 => {
  return new Web3(INFURA_URL);
};

export const getWalletBalance = async (address: string): Promise<number> => {
  const web3Client = getWeb3Instance();
  const weiBalance = await web3Client.eth.getBalance(address);
  return Number(web3Client.utils.fromWei(weiBalance, "ether"));
};

export const distributeAndEncryptoKey = async (privateKey: string) => {
  const secret = ss.str2hex(privateKey); // string값을 Hex로 변환 -> 16진수 문자열

  const shareArray = ss.share(secret, shares, threshold);
  // share은 secret값을 나누는 함수
  // 예를들어 2, 3을 입력하면
  // secret를 3개의 조각으로 나누고, 이 중 2개의 조각만 있으면 복호화 가능하게 구성 됨

  const encrypShares = shareArray.map((share) => {
    // 해당 값은 배열로 나오기 떄문에 각각의 값에 대해서 PBKDF2를 사용하여 직렬화 실행

    const iv = crypto.randomBytes(16); // 랜덤 값 생성

    // 해당 값을 암호화
    // PBKDF2는 입력된 값에 대해서 여러번 반복해서 보안성이 높은 키를 생성
    // createCipheriv는 키, 알고리즘, 랜덤 값을 통해서 인스턴스를 생성

    const ci = crypto.createCipheriv(
      "aes-256-cbc",
      crypto.pbkdf2Sync(PASSWORD, SALT, ITERATIONS, KEYLEN, DIGEST),
      iv
    );

    // 암호화를 수행
    let encrypt = ci.update(share, "utf8", "hex"); //utf8로 인코딩 하고, 16진수 문자열로 바꿔주며 암호화를 진행

    encrypt += ci.final("hex"); // 이후, 해당 값을 hex값으로 변환

    return {
      iv: iv.toString("hex"),
      encrypShares: encrypt,
    };
  });

  // 법적으로 키에 대한 보관을 피해가기 위해서는 해당 키를 분산화 시켜야 한다.
  // 그러기 떄문에 실제 서비스 에서는 각각의 material을 따로 보관을 해야 한다.
  // 예를들면 AWS같은 클라우드 서비스에...!!

  // 그 후 서명을 할떄 기준값을 통해서 값을 모두 가져와서, 해당 값들을 다시 합쳐서 PrivateKey를 가져오면
  // 키 분산화 로직이 완료된다.

  // 아래에 있는 로직은 Aws에 키를 저장하고, 후에 가져와서 Parse하는 로직
  const material_ = encrypShares.slice(0, 2); // Take the first 4 shares
  const secondMaterial = encrypShares.slice(2, 4);

  const stringFyMaterial = JSON.stringify(material_);
  const stringFySecondMaterial = JSON.stringify(secondMaterial);

  const parseOne = JSON.parse(stringFyMaterial);
  const parseTwo = JSON.parse(stringFySecondMaterial);

  const newMaterial = [...parseOne, ...parseTwo];

  decryptAndRestoreKey(JSON.stringify(newMaterial));

  return stringFyMaterial;
};

export const decryptAndRestoreKey = async (source: string) => {
  const material = JSON.parse(source);

  const decryptedShares = material.map((share) => {
    const iv = Buffer.from(share.iv, "hex");

    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      crypto.pbkdf2Sync(PASSWORD, SALT, ITERATIONS, KEYLEN, DIGEST),
      iv
    );

    let decrypted = decipher.update(share.encrypShares, "hex", "utf8");

    decrypted += decipher.final("utf8");

    return decrypted;
  });

  const keyHex = ss.combine(decryptedShares);
  const decrypt = ss.hex2str(keyHex);

  return decrypt; // return Private Key
};
