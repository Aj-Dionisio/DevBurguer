import { Container, Form, LeftContainer, RightContainer, Title, InputContainer, Link, Button } from "./styles";
import Logo from '../../assets/Logo.png'


export default function Login() {
    return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt="logo-devburguer" />
            </LeftContainer>

            <RightContainer>
                <Title>
                    Olá, seja bem vindo ao <span>Dev Burguer!</span>
                    Acesse com seu <span>Login e senha.</span>
                </Title>
                <Form>
                    <InputContainer>
                        <label>Email</label>
                        <input type="email"/>
                    </InputContainer>

                    <InputContainer>
                        <label>Senha</label>
                        <input type="password"/>
                    </InputContainer>

                    
                    <Button>Entrar</Button>

                </Form>
                <Link>Não possui conta? Clique aqui!</Link>

            </RightContainer>


        </Container>
    );
}