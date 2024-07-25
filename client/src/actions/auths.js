import axios from 'axios';
import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';
import { useSelector } from 'react-redux';

export const Authentication = () => {

    const bootmail = useSelector((state) => state.user.bootmail);
    const password = useSelector((state) => state.user.bootpassword);
    const adminLoginState = useSelector(state => state.user.bootloginstate);

    const sessionMail = sessionStorage.gmail || "1234";
    const sessionPassword = sessionStorage.password || "1234";

    let adminpass;
    try {
        adminpass = CryptoAES.decrypt(sessionPassword, sessionMail).toString(CryptoENC);
    } catch (error) {
        console.error('Error decrypting admin password:', error);
        adminpass = '';
    }

    let bootpass;
    try {
        bootpass = CryptoAES.decrypt(password || "1234", bootmail || "1234").toString(CryptoENC);
    } catch (error) {
        console.error('Error decrypting boot password:', error);
        bootpass = '';
    }

    axios.defaults.headers.common['admail'] = bootmail
    axios.defaults.headers.common['adpass'] = bootpass

    return { bootmail, adminpass, bootpass, adminLoginState };
};