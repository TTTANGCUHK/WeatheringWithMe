import CRandomStr from "crypto-random-string"
import Crypto from "crypto-js";

const APICRYPTO = {
    GEN_SALT: () => {
        return CRandomStr({ length: 10, type: 'alphanumeric' });
    },

    CRYPTO_PW: (pw, salt) => {
        return Crypto.SHA256(pw + salt).toString();
    }
}

export default APICRYPTO