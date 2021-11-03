import CommonPageLayout from "../Components/CommonPageLayout";

// 예시 페이지입니다.
// navLinks 예시와 같이 navbar에 추가되어야할 버튼들의 이름과 경로를
// CommonPageLayout의 props로 넘겨주면
// navbar에 해당 버튼이 생성됩니다.
// 만약 와이어프레임상 하단 탭버튼이 표시돼야 할 경우 currentTab props를 사용합니다.
export default function TestPage() {
  const navLinks = [
    {
      name: "노트로",
      route: "/notes",
    },
  ];

  return (
    <CommonPageLayout currentTab={0} navLinks={navLinks}>
      <h1>Test!!!</h1>
    </CommonPageLayout>
  );
}
