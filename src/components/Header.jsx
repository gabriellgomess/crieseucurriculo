import { Link } from 'react-router-dom';
import { Button, Typography } from 'antd';
const { Text, Title } = Typography;


const Header = ({ handleLogout, isMobile, user }) => {
    return (
        <header className='color-bg-secondary' style={{ width: '100%', height: '100px', display: 'flex', alignItems: 'center', flexDirection: isMobile ? 'column' : 'row' , justifyContent: isMobile?'center':'space-between', padding: '0 30px' }}>
            <nav style={{ display: 'flex', gap: '25px' }}>
                <Link to="/">
                    <Title level={3}>Home</Title>
                </Link>
                <Link to="/curriculos">
                    <Title level={3}>Meus Currículos</Title>
                </Link>

            </nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img width={isMobile?30:60} style={{ borderRadius: '50%' }} src={user.picture} alt="" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text strong>{user.name}</Text>
                    <Text>{user.email}</Text>
                </div>
                <Button className='color-text-light' type='text' onClick={() => handleLogout()}>Sair</Button>                
            </div>
        </header>
    );
}

export default Header;