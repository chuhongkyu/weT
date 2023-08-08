export const questions = [
    {
        title:"당신은 여가 시간에 OTT를 통해 무엇을 시청하시나요?",
        answer: {
            yes: "영화, 드라마를 봐요~",
            no: "저는 예능, 다큐멘터리가 좋아요!"
        },
        score: {
            yes :{
                nef: 3,
                wat: 3,
                wav: 1,
                tiv: 1,
                dis: 3,
            },
            no : {
                nef: 1,
                wat: 1,
                wav: 3,
                tiv: 3,
                dis: 2,
            }
        }
    },
    {
        title:"당신은 콘텐츠를 볼때 잔인인하고 폭력적인 것도 곧 잘 보시나요?",
        answer: {
            yes: "네, 저는 잔인하고 폭력적인 것도 내용에 일부라면 잘 봐요",
            no: "아니요, 저는 폭력적이고 잔인한건 싫어요."
        },
        score: {
            yes :{
                nef: 2,
                wat: 1,
                wav: 0,
                tiv: 0,
                dis: 0,
            },
            no : {
                nef: -1,
                wat: -1,
                wav: 0,
                tiv: 0,
                dis: 2,
            }
        }
    },
    {
        title:"당신은 귀엽고 잔잔한 콘텐츠를 좋아하나요?",
        answer: {
            yes: "네, 저는 귀여운게 좋아요.",
            no: "아니요, 꼭 그렇지는 않아요"
        },
        score: {
            yes :{
                nef: 0,
                wat: 0,
                wav: 1,
                tiv: 1,
                dis: 3,
            },
            no : {
                nef: 1,
                wat: 1,
                wav: 0,
                tiv: 0,
                dis: 0,
            }
        }
    },
    {
        title: "당신은 신작을 본다면 K-콘텐츠와 해외 콘텐츠중 무엇을 선호 하시나요?",
        answer: {
            yes: "저는 해외 콘텐츠의 신작을 바로바로 보고싶어요!",
            no: "저는 K-콘텐츠를 실시간 시청하고 싶어요!"
        },
        score: {
            yes :{
                nef: 3,
                wat: 2,
                wav: 1,
                tiv: 1,
                dis: 3,
            },
            no : {
                nef: 1,
                wat: 0,
                wav: 3,
                tiv: 3,
                dis: 1,
            }
        }
    },
]