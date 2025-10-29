import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { appLogin, setClipboardText } from "@apps-in-toss/web-framework";
import { Button } from "@toss/tds-mobile";

function App() {
  const [state, setState] = useState({
    code: "",
    referrer: "",
  });
  const [locationInfo, setLocationInfo] = useState(null);
  const login = async () => {
    console.log("로그인 시작");
    try {
      const res = await appLogin();

      console.log("res", res);

      setState({
        code: res.authorizationCode,
        referrer: res.referrer,
      });
    } catch (e) {
      console.error(e);
      console.log("AccessToken을 가져오는 중 문제가 발생했어요.");
    } finally {
      console.log("완료");
    }
  };

  const clip = async () => {
    try {
      await setClipboardText(state.code);
      alert("텍스트가 복사됐어요!");
    } catch (error) {
      alert("권한거부");
    }
  };

  return (
    <>
      window.location 값 <br />
      <pre>
        {locationInfo ? JSON.stringify(locationInfo, null, 2) : "Loading..."}
      </pre>
      <br />
      <hr />
      <br />
      토스 로그인 값 확인
      <br />
      <br />
      <Button display="block" onClick={login}>
        토스 로그인 하기
      </Button>
      <br />
      <br />
      <br />
      authorizationCode: {state.code}
      <br />
      <br />
      referrer: {state.referrer}
      <br />
      <br />
      {state.code ? (
        <Button type="button" display="block" onClick={clip}>
          authorizationCode 복사하기
        </Button>
      ) : (
        ""
      )}
      <br />
      <hr />
      <br />
      <br />
      <br /> <br /> <br /> <br /> <br /> <br /> <br />
    </>
  );
}

export default App;
