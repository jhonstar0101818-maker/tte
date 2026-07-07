export interface Track {
  id: number;
  title: string;
  url: string;
}

export interface Album {
  title: string;
  subtitle: string;
  artist: string;
  description: string;
  coverImage: string;
  tracks: Track[];
}

export const albumData: Album = {
  title: "FROM MIDNIGHT TO SUNRISE",
  subtitle: "수고했어, 오늘도",
  artist: "ENFP놀자 | Suno AI",
  description: "자정부터 새벽까지, 감정의 여정을 담은 11곡의 감성 앨범",
  coverImage: "/manus-storage/kpop_album_cover_final_v2_e7231163.png",
  tracks: [
    {
      id: 1,
      title: "비가 그친 방에는 늘 네가 산다",
      url: "https://watery-emerald-gtwhf8an.edgeone.dev/01_비가%20그친%20방에는%20늘%20네가%20산다.mp3",
    },
    {
      id: 2,
      title: "추억이란 도화지에 그리움을 그린다",
      url: "https://watery-emerald-gtwhf8an.edgeone.dev/02_추억이란%20도화지에%20그리움을%20그린다..mp3",
    },
    {
      id: 3,
      title: "감정 과부하 (Overflow)",
      url: "https://watery-emerald-gtwhf8an.edgeone.dev/03_감정%20과부하.mp3",
    },
    {
      id: 4,
      title: "마침표를 찍지 못한 문장",
      url: "https://watery-emerald-gtwhf8an.edgeone.dev/04_마침표를%20찍지%20못한%20문장.mp3",
    },
    {
      id: 5,
      title: "새벽 세 시, 번지는 조명 아래서",
      url: "https://watery-emerald-gtwhf8an.edgeone.dev/05_새벽%20세%20시,%20번지는%20조명%20아래서.mp3",
    },
    {
      id: 6,
      title: "허물어지는 콘크리트 벽",
      url: "https://watery-emerald-gtwhf8an.edgeone.dev/06_허물어지는%20콘크리트%20벽.mp3",
    },
    {
      id: 7,
      title: "발걸음에 무게를 덜어내는 방법",
      url: "https://watery-emerald-gtwhf8an.edgeone.dev/07_발걸음에%20무게를%20덜어내는%20방법.mp3",
    },
    {
      id: 8,
      title: "네모 상자 탈출기 (The Sandbox)",
      url: "https://watery-emerald-gtwhf8an.edgeone.dev/08_네모%20상자%20탈출기%20(The%20Sandbox).mp3",
    },
    {
      id: 9,
      title: "너는 너 나는 나",
      url: "https://watery-emerald-gtwhf8an.edgeone.dev/09_너는%20너%20나는%20나.mp3",
    },
    {
      id: 10,
      title: "삼천포로 빠진 인생이 더 재밌는 이유",
      url: "https://watery-emerald-gtwhf8an.edgeone.dev/10_삼천포로%20빠진%20인생이%20더%20재밌는%20이유.mp3",
    },
    {
      id: 11,
      title: "ENFP 놀자! (Festival)",
      url: "https://watery-emerald-gtwhf8an.edgeone.dev/11_ENFP%20(Festival)%20놀자!.mp3",
    },
  ],
};
