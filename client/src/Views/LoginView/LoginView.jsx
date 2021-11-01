import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { logInUser } from "../../api/userAPI";

export default function LoginView() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  // const [isRemember, setIsRemember] = useState(false);
  // const [ cookies, setCookie,removeCookie] = useCookies([''])
  const { email, password } = loginInfo;

  // useEffect(() => {

  // }.[])

  const handleChange = (e) => {
    const { value, name } = e.target;

    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
    console.log("loginInfo", loginInfo); // 한 스텝 이전 정보가 저장되는데 수정 필요.
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // email & password validation
    if (loginInfo.email.length === 0 || loginInfo.password.length === 0) {
      return alert("아이디 혹은 비번을 입력하지 않았습니다");
    }

    if (!loginInfo.email.includes("@")) {
      return alert("올바르지 않은 이메일을 입력하였습니다");
    }

    console.log("submit loginInfo", loginInfo);
    // 데이터 보내기
    logInUser(email, password);
  };

  // 내 정보 기억하기 체크박스 핸들 함수 작성할 것
  const handleCheck = () => {
    return;
  };

  return (
    <Container>
      <p>로그인</p>
      <LoginForm>
        <InputForm>
          <p>이메일(아이디)</p>
          <input
            name="email"
            type="email"
            value={email}
            placeholder="이메일주소를 입력하세요"
            onChange={handleChange}
          />
          <p>비밀번호</p>
          <input
            name="password"
            type="password"
            value={password}
            placeholder="비밀번호를 입력하세요"
            onChange={handleChange}
          />
        </InputForm>

        <ButtonForm>
          <button type="submit" onClick={onSubmit}>
            로그인
          </button>
          <p>
            <input
              name="rememberUserInfo"
              type="checkbox"
              onChange={handleCheck}
              // checked={isRemember}
            />
            내 정보 기억하기
          </p>
          <Link to="/signup">
            <p>회원가입하기</p>
          </Link>
        </ButtonForm>
      </LoginForm>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 100px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const LoginForm = styled.div`
  margin: 10px;
  padding: 10px;

  background-color: lightgray;
  border-radius: 10px;
`;
const InputForm = styled.div``;

const ButtonForm = styled.div`
  margin-top: 10px;
`;
