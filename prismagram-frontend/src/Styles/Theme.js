// box 경계선
const BOX_BORDER = "1px solid #DBDBDB";
// border Radius (나중에 수정, 로그인 시에만 4px, post화면에서는 3px)
const BORDER_RADIUS = "4px";

export default {
    // background 색
    bgColor: "#FAFAFA",
    
    // 색 코드
    blackColor: "#262626",
    blueColor: "#0095F6",
    darkblueColor: "#00376B",
    grayColor: "#8E8E8E",
    lightgrayColor: "#C7C7C7",
    redColor: "#ED4956",

    // box-border and border-radius
    boxBorder: "1px solid #DBDBDB",
    borderRadius: "4px",

    // maxWidth
    maxWidth: "935px",

    // white Box - instagram에서 많이 사용
    // templete과 비슷한 형태
    whiteBox: `border: ${BOX_BORDER};
               border-radius: ${BORDER_RADIUS};
               background-color: white;
    `
}