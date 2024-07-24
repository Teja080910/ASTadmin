import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';
import { useSelector } from 'react-redux';

export const Authentication = () => {
    const bootmail = useSelector((state) => state.user.bootmail);
    const password = useSelector((state) => state.user.bootpassword);

    const sessionMail = sessionStorage.gmail || "1234";
    const sessionPassword = sessionStorage.password || "1234";

    const adminEmail = useSelector(state => state.user.adminEmail);
    const consolepassword = useSelector((state) => state.user.adminPass);
    const adminLoginState = useSelector(state => state.user.adminLoginState);

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

    let consolepass;
    try {
        consolepass = CryptoAES.decrypt(consolepassword || "1234", adminEmail || "1234").toString(CryptoENC);
    } catch (error) {
        console.error('Error decrypting console password:', error);
        consolepass = '';
    }

    return { bootmail, adminpass, bootpass, consolepass, adminEmail, adminLoginState };
};