import type { Question, CharacterType } from '~/types/quiz'
import { MEMBER_NAMES } from './members'

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    title: '산타가 부상으로 오늘 밤 비행이 불가능하다',
    desc: `북극 기지에 긴급 호출이 울린다.
오늘 밤, 산타는 부상으로 썰매에 오를 수 없다는 소식.
선물은 이미 준비됐고, 아이들은 지금 이 순간에도 잠들고 있다.
누군가는 바로 움직여야 한다는 사실만이 분명하다.`,
    choices: {
      A: '상황 빠르게 파악하고 바로 출발',
      B: '선물 목록과 경로 재점검',
      C: '엘프들과 역할 분담',
      D: '잠시 숨 고르기와 마음 정리'
    },
    scores: {
      A: { lena: 5, rahel: 5, dowon: 2, runa: 5 },
      B: { lena: 4, rahel: 3, dowon: 5, runa: 3 },
      C: { lena: 5, rahel: 4, dowon: 3, runa: 4 },
      D: { lena: 1, rahel: 1, dowon: 1, runa: 2 }
    }
  },
  {
    id: 2,
    title: '예정보다 거센 눈보라가 앞을 가로막는다',
    desc: `첫 번째 마을로 향하던 중, 눈보라가 시야를 집어삼킨다.
바람은 방향을 바꾸고, 눈은 경로를 가린다.
이대로 강행하면 시간은 줄일 수 있지만 위험이 따른다.
선택 하나에 오늘 밤의 흐름이 달라질 것 같다.`,
    choices: {
      A: '일정이 밀려도 그대로 직진',
      B: '안전한 경로로 우회',
      C: '다른 배달 순서로 조정',
      D: '잠시 날씨가 잦아들길 대기'
    },
    scores: {
      A: { lena: 2, rahel: 4, dowon: 0, runa: 3 },
      B: { lena: 4, rahel: 3, dowon: 5, runa: 4 },
      C: { lena: 5, rahel: 5, dowon: 2, runa: 5 },
      D: { lena: 1, rahel: 0, dowon: 1, runa: 1 }
    }
  },
  {
    id: 3,
    title: '집 안의 불이 아직 꺼지지 않았다',
    desc: `굴뚝 앞에 도착했을 때, 집 안의 불이 아직 켜져 있다.
누군가 아직 깨어 있을지도 모른다.
한 발짝 한 발짝이 유난히 크게 느껴지는 순간.
이 집을 어떻게 다녀갈지, 짧은 판단이 필요하다.`,
    choices: {
      A: '들키지 않게 빠른 이동',
      B: '소리 나지 않도록 더 신중하게',
      C: '혹시 아이가 깨어있을지 신경 쓰기',
      D: '괜히 긴장하며 발걸음 늦추기'
    },
    scores: {
      A: { lena: 2, rahel: 5, dowon: 0, runa: 4 },
      B: { lena: 4, rahel: 2, dowon: 3, runa: 4 },
      C: { lena: 5, rahel: 3, dowon: 5, runa: 5 },
      D: { lena: 5, rahel: 1, dowon: 4, runa: 3 }
    }
  },
  {
    id: 4,
    title: '주소와 이름이 애매한 선물이 하나 있다',
    desc: `선물 하나를 집어 들었는데, 주소와 이름이 애매하다.
분명 누군가를 위한 것이지만 확신이 서지 않는다.
지금 판단하지 않으면 밤은 계속 흘러간다.
이 선물은 어떻게 해야 할까?`,
    choices: {
      A: '직감으로 판단해 전달',
      B: '기록 다시 확인',
      C: '엘프에게 문의',
      D: '잠시 보류하고 다음 집으로'
    },
    scores: {
      A: { lena: 1, rahel: 5, dowon: 2, runa: 3 },
      B: { lena: 5, rahel: 2, dowon: 5, runa: 4 },
      C: { lena: 5, rahel: 3, dowon: 5, runa: 5 },
      D: { lena: 4, rahel: 4, dowon: 1, runa: 4 }
    }
  },
  {
    id: 5,
    title: '배달 도중 선물이 하나 부족하다는 걸 알게 된다',
    desc: `정리를 하던 중, 선물이 하나 모자란다는 사실을 깨닫는다.
실수인지 계산 착오인지 알 수 없다.
이미 절반 이상을 배달한 뒤다.
마음이 급해지지만, 선택은 해야 한다.`,
    choices: {
      A: '있는 선물로 최대한 대체',
      B: '다시 계산해 실수 여부 확인',
      C: '공평하게 나눌 방법 고민',
      D: '마음이 무거워 잠시 멈춤'
    },
    scores: {
      A: { lena: 5, rahel: 5, dowon: 2, runa: 5 },
      B: { lena: 4, rahel: 2, dowon: 5, runa: 4 },
      C: { lena: 4, rahel: 3, dowon: 3, runa: 4 },
      D: { lena: 3, rahel: 0, dowon: 0, runa: 2 }
    }
  },
  {
    id: 6,
    title: '굴뚝이 생각보다 많이 좁아 보인다',
    desc: `다음 집의 굴뚝은 눈으로 보기에도 비좁아 보인다.
억지로 들어갈 수는 있겠지만 무사할지는 장담할 수 없다.
밤은 깊어가고, 집은 아직 많다.
이 집을 대하는 방식이 떠오른다.`,
    choices: {
      A: '어떻게든 몸 밀어 넣기',
      B: '다른 진입 방법 찾기',
      C: '집 구조 살펴 안전한 방법 고민',
      D: '이 집을 마지막으로 미루기'
    },
    scores: {
      A: { lena: 1, rahel: 0, dowon: 0, runa: 3 },
      B: { lena: 5, rahel: 5, dowon: 5, runa: 5 },
      C: { lena: 4, rahel: 4, dowon: 5, runa: 5 },
      D: { lena: 0, rahel: 3, dowon: 0, runa: 1 }
    }
  },
  {
    id: 7,
    title: '배달이 절반쯤 끝났을 무렵, 체력이 급격히 떨어진다',
    desc: `배달이 절반쯤 끝났을 때, 몸이 무겁게 느껴진다.
집중력도 예전 같지 않다.
아직 끝이 아니라는 사실이 부담으로 다가온다.
이 상태로 밤을 계속 버틸 수 있을까?`,
    choices: {
      A: '끝까지 버티겠다는 마음',
      B: '속도 조절해 오래 갈 방법 찾기',
      C: '스스로에게 괜찮다고 다독임',
      D: '잠깐 쉬어야 한다는 인정'
    },
    scores: {
      A: { lena: 5, rahel: 5, dowon: 5, runa: 5 },
      B: { lena: 3, rahel: 3, dowon: 2, runa: 3 },
      C: { lena: 5, rahel: 3, dowon: 3, runa: 3 },
      D: { lena: 1, rahel: 4, dowon: 0, runa: 1 }
    }
  },
  {
    id: 8,
    title: '우연히 아이의 소원이 적힌 편지를 읽게 된다',
    desc: `굴뚝 옆에서 아이의 편지를 우연히 읽게 된다.
소원은 간절하지만, 현실은 복잡하다.
그래도 이 마음을 그냥 넘겨도 되는 걸까.
손에 쥔 편지가 쉽게 접히지 않는다.`,
    choices: {
      A: '몰래 도와주기',
      B: '현실적으로 가능한 선 판단',
      C: '아이의 마음을 안고 함께 고민',
      D: '편지를 조용히 접어두기'
    },
    scores: {
      A: { lena: 5, rahel: 5, dowon: 3, runa: 5 },
      B: { lena: 4, rahel: 4, dowon: 5, runa: 5 },
      C: { lena: 3, rahel: 4, dowon: 4, runa: 3 },
      D: { lena: 1, rahel: 2, dowon: 0, runa: 3 }
    }
  },
  {
    id: 9,
    title: '마지막 마을을 앞두고 시간이 빠듯해진다',
    desc: `마지막 마을이 눈앞에 보이지만 시간이 빠듯하다.
모든 집을 다 돌기엔 밤이 짧다.
무엇을 우선해야 할지 머릿속이 빠르게 돌아간다.
이 선택이 오늘 밤의 마지막 방향을 정한다.`,
    choices: {
      A: '가장 중요한 집부터',
      B: '계획 다시 정리',
      C: '모두에게 최대한 공평하게',
      D: '내가 감당할 수 있는 만큼만'
    },
    scores: {
      A: { lena: 5, rahel: 4, dowon: 4, runa: 1 },
      B: { lena: 4, rahel: 5, dowon: 5, runa: 3 },
      C: { lena: 5, rahel: 3, dowon: 3, runa: 5 },
      D: { lena: 3, rahel: 4, dowon: 0, runa: 1 }
    }
  },
  {
    id: 10,
    title: '모든 배달을 마친 뒤, 하늘 위에 멈춰 선다',
    desc: `모든 배달을 마치고 하늘 위에 멈춰 선다.
도시는 조용히 잠들어 있고 새벽은 가까워온다.
지금 이 순간, 가장 먼저 떠오르는 것은 무엇일까.
이 밤을 지나온 너 자신의 마음을 마주한다.`,
    choices: {
      A: '무사히 끝났다는 성취감',
      B: '큰 실수 없었다는 안도감',
      C: '아이들이 기뻐할 얼굴',
      D: '긴 밤을 버틴 나 자신'
    },
    scores: {
      A: { lena: 5, rahel: 5, dowon: 5, runa: 5 },
      B: { lena: 3, rahel: 4, dowon: 2, runa: 5 },
      C: { lena: 5, rahel: 3, dowon: 5, runa: 3 },
      D: { lena: 2, rahel: 3, dowon: 3, runa: 1 }
    }
  }
]

export const CHARACTER_PROFILES = {
  lena: {
    type: 'A' as CharacterType,
    name: MEMBER_NAMES.lena,
    traits: ['빠른 결단력', '추진력', '목표지향적', '실행력']
  },
  rahel: {
    type: 'B' as CharacterType,
    name: MEMBER_NAMES.rahel,
    traits: ['체계적', '분석적', '안정지향적', '꼼꼼함', '집요함']
  },
  dowon: {
    type: 'C' as CharacterType,
    name: MEMBER_NAMES.dowon,
    traits: ['공감능력', '전략적 사고', '균형감각', '배려심']
  },
  runa: {
    type: 'D' as CharacterType,
    name: MEMBER_NAMES.runa,
    traits: ['정서적', '신중함', '자기이해', '감수성']
  }
} as const
