# express / react 프로젝트

## 간단한 crud 및 개발 패턴 적용, 개인 취향을 많이 반영, 코드화는 안함

### 참고
```
mysql은 server > config > config.json 파일 확인하여 정보 수정 필요
server port 설정 변경은 server > .env.development 파일에서 수정
server > 기본적인 crud는 완료
```

### TODO
```
server(express)
  1. express validator 적용 해보기
```

### 명령어
```
yarn install
yarn sstart   >>  server 실행 
yarn cstart   >>  react 실행
yarn create_db   >>  db 새성 실행
```

### test 코드 예시
```
실행: yarn test
코드:
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

```