// 메타마스크가 없거나 로그인이 안되있는경우 로직 컨테이너
// 지갑이 없는경우 window.ethereum 이 undefined
import { useState, useEffect, useCallback } from 'react';
// import Web3 from 'web3';

const Metamask = (props: any) => {
  // const web3 = new Web3((window as any).ethereum);
  const [loginState, setLoginState] = useState(false); // 불필요한 코드 => 상태는 글로벌로 예정
  const loginCheck = useCallback(() => {
    // 이함수는 ethereum 이 undefined 이 아닐때  => 메타마스크는 있을때 실행해야함
    // 1. 로그인이 되어있다면 주소를 가져옴
    // 2. 로그인이 안되어있다면 새탭 => 자동으로 됨

    new Promise((resolve, reject) => {
      resolve(
        (window as any).ethereum.request({ method: 'eth_requestAccounts' })
      );
    })
      .then(() => {
        console.log('정상 주소 받아옴');
        setLoginState(true); // Context or 리덕스 상태변경 코드 들어와야할곳
        // 주소를 받을 수 있다면 받아서 그 주소 상태 쓰면 될듯
      })
      .catch(() => {
        console.log('로그인 X');
        setLoginState(false); // Context or 리덕스 상태변경 코드 들어와야할곳
        // 로그인은 안된상태이니 주소는 비워줄것
      });
  }, []);

  // console.log(loginState);

  useEffect(() => {
    if ((window as any).ethereum !== undefined) {
      // 메타마스크가 있지만 로그인이 안되어있거나 되어있을때
      loginCheck();
    }
    if ((window as any).ethereum === undefined) {
      // 메타마스크가 없거나 로그인 안되어있을경우, 스토리지 삭제
      // (window as any).ethereum === undefined < 메타마스크가 없는상태
      //
      console.log('없음 확인');
    }
  });

  // window.ethereum.request({ method: 'eth_requestAccounts' }).then(() => {});
  return <div>{props.children}</div>;
};

export default Metamask;
