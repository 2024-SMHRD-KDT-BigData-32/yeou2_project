
import { useNavigate } from 'react-router-dom';

const useMove = () => {
    const navigate = useNavigate();

    const moveMain = () => navigate('/');
    const moveSignUp = () => navigate('/SignUp');
    const moveLogin = () => navigate('/Login');
    const moveFindId = () => navigate('/FindID');
    const moveFindPw = () => navigate('/FindPW');
    const moveMyPage = () => navigate('/MyPage');
    const moveSearch = () => navigate('/Search');
    const moveAdminCustomer = () => navigate('/AdminCustomer');
    const moveAdminQuestion = () => navigate('/AdminQuestion');
    const moveAdminProduct = () => navigate('/AdminProduct');
    
    return {
        moveMain,
        moveSignUp,
        moveLogin,
        moveFindId,
        moveFindPw,
        moveMyPage,
        moveSearch,
        moveAdminCustomer,
        moveAdminQuestion,
        moveAdminProduct,
    };
};

export default useMove;
