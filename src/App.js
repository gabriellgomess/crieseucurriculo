import { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { FacebookOutlined, InstagramOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';
import pt_BR from "antd/locale/pt_BR";
import moment from 'moment';
import 'moment/locale/pt-br';

// Components
import Header from './components/Header';

// Pages
import Home from './pages/Home';
import Curriculos from './pages/Curriculos';

// Imgem
import logo from './assets/img/LOGO-PERFIL1.png';
import bgLogin from './assets/img/bg-login.jpg';


// Ant Design
import { ConfigProvider, Card, Typography, Steps } from 'antd';
const { Meta } = Card;


moment.locale('pt-br');

function App() {

  // mobile
  const isMobile = useMediaQuery({ maxWidth: 767 });
  // notebook
  const isNotebook = useMediaQuery({ minWidth: 768, maxWidth: 1600 });

  const { Title, Text } = Typography;

  // Definindo tokens de design personalizados
  const theme = {
    components: {
      Button: {
        colorPrimary: '#26A69A',
        colorPrimaryHover: '#80CBC4',
        colorPrimaryActive: '#43A49B',
        colorPrimaryFocus: '#26A69A',

      },
      Typography: {
        colorTextHeading: '#263339',
        colorText: '#263339',
      },
      Input: {
        activeBg: '#E0F2F1',
        activeBorderColor: '#26A69A',
        hoverBorderColor: '#26A69A',

      },
      InputNumber: {
        activeBg: '#E0F2F1',
        activeBorderColor: '#26A69A',
        hoverBorderColor: '#26A69A',

      },
      DatePicker: {
        activeBg: '#E0F2F1',
        activeBorderColor: '#26A69A',
        hoverBorderColor: '#26A69A',

      },
      Steps: {
        colorPrimary: '#26A69A',
        colorText: '#26A69A',
        colorTextDescription: '#263339',

      },
    },
  };

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Função para verificar se há um usuário armazenado no localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setUser(decoded);
    // set in localStorage
    console.log(decoded);
    localStorage.setItem('user', JSON.stringify(decoded));
  };

  const handleLogout = () => {
    setUser(null); // Limpa os dados do usuário ao fazer logout
    // remove from localStorage
    localStorage.removeItem('user');
    // Navigate to home page after logout
    navigate('/');
  };

  const handleLoginFailure = () => {
    console.log('Login Failed');
  };

  return (
    <ConfigProvider theme={theme} locale={pt_BR}>
      <div style={{ width: '100vw', minHeight: isMobile ? '100%' : '100vh' }}>
        {!user ? (
          <div style={{ width: '100%', height: isMobile?'100%':'100vh', paddingBottom: '30px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${bgLogin})`, backgroundSize: 'cover', backgroundPosition: '50%' }}>
            <div style={{ width: '50%', minWidth: '400px' }}>
              <Title level={1} style={{ color: '#fff', textAlign: 'center', fontSize: isNotebook?'40px':isMobile?'32px':'52px', textShadow: '2px 2px 4px #434343' }}>Bem-vindo ao Crie seu Currículo</Title>
              <Title level={3} style={{ color: '#408d86', textAlign: 'center', marginBottom: '50px', textShadow: '1px 1px 1px #434343' }}>Transforme suas habilidades e experiências em oportunidades!</Title>
              <div style={{ width: '90%', margin: '0 auto' }}>
                <Steps
                  direction="vertical"
                  current={3}
                  items={[
                    {
                      title: 'Cadastre-se',
                      description: 'Forneça seus dados pessoais e profissionais de forma segura.',
                    },
                    {
                      title: 'Faça o Pagamento',
                      description: 'Com nosso processo de pagamento seguro, gere e imprima seu currículo por apenas R$9,99!',
                    },
                    {
                      title: 'Baixe seu Currículo',
                      description: 'Após a conclusão, baixe seu currículo em formato PDF, pronto para ser enviado a seus futuros empregadores.',
                    },
                  ]}
                />
                <div style={{ marginTop: '40px', display: isMobile ? 'none' : 'block' }}>
                  <Title style={{ color: '#fff', textAlign: 'center', fontSize: isNotebook?'18px':isMobile?'8px':'24px', textShadow: '1px 1px 1px #434343'  }}>Por que escolher o Crie seu Currículo?</Title>
                  <Title style={{ color: '#fff', textAlign: 'center', fontSize: isNotebook?'18px':isMobile?'8px':'24px', textShadow: '1px 1px 1px #434343'  }}>Facilidade de Uso: Interface intuitiva que simplifica a criação do currículo.</Title>
                  <Title style={{ color: '#fff', textAlign: 'center', fontSize: isNotebook?'18px':isMobile?'8px':'24px', textShadow: '1px 1px 1px #434343'  }}>Segurança: Seus dados estão protegidos conosco.</Title>
                  <Title style={{ color: '#fff', textAlign: 'center', fontSize: isNotebook?'18px':isMobile?'8px':'24px', textShadow: '1px 1px 1px #434343'  }}>Acessível: Plano adaptado à sua necessidade, com excelentes opções de pagamento.</Title>
                </div>

                {/* icons */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
                  <Link to="https://www.facebook.com/crieseucurriculo" target='blank'>
                    <FacebookOutlined style={{ fontSize: '30px', color: '#263339' }} />
                  </Link>
                  <Link to="https://www.instagram.com/crieseucurriculo/" target='blank'>
                    <InstagramOutlined style={{ fontSize: '30px', color: '#263339' }} />
                  </Link>
                  <Link to="https://www.linkedin.com/company/crieseucurriculo/?viewAsMember=true" target='blank'>
                    <LinkedinOutlined style={{ fontSize: '30px', color: '#263339' }} />
                  </Link>
                  <Link to="mailto:contato@crieseucurriculo.com" target='blank'>
                    <MailOutlined style={{ fontSize: '30px', color: '#263339' }} />
                  </Link>

                </div>

              </div>
            </div>
            <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '400px' }}>
              <Card
                hoverable
                bordered={false}
                style={{ width: '300px', marginTop: '80px', backdropFilter: 'blur(16px) saturate(180%)', backgroundColor: 'rgba(38, 166, 154, 0.58)' }}

              >
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <img
                    style={{ width: '120px' }}
                    alt="sistema de geração de arquivos de remessa bancária"
                    src={logo}
                  />
                </div>

                <Title level={3} style={{ color: '#fff', textAlign: 'center', marginTop: '20px' }}>Faça seu login</Title>

                <Meta

                  style={{ margin: '10px 0' }}
                />
                <GoogleLogin
                  onSuccess={handleLoginSuccess}
                  onError={handleLoginFailure}
                />
              </Card>
            </div>

          </div>
        ) : (
          <div className='color-bg-light' style={{ paddingBottom: '40px' }}>
            <Header handleLogout={handleLogout} isMobile={isMobile} user={user} />
            <div style={{ width: '80%', margin: '20px auto 0 auto', minHeight: '100vh' }}>
              <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route path="/curriculos" element={<Curriculos user={user} />} />
              </Routes>
            </div>
          </div>
        )}
      </div>
    </ConfigProvider>
  );
}

export default App;
