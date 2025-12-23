export type MemberKey = 'lena' | 'runa' | 'dowon' | 'rahel'

export const TWITTER_HANDLES: Record<MemberKey, string> = {
  lena: 'FKEYS_lena',
  runa: 'FKEYS_runa',
  dowon: 'FKEYS_dowon',
  rahel: 'FKEYS_rahel'
}

export const TWITTER_URLS: Record<MemberKey, string> = {
  lena: `https://twitter.com/${TWITTER_HANDLES.lena}`,
  runa: `https://twitter.com/${TWITTER_HANDLES.runa}`,
  dowon: `https://twitter.com/${TWITTER_HANDLES.dowon}`,
  rahel: `https://twitter.com/${TWITTER_HANDLES.rahel}`
}

export const MEMBER_NAMES: Record<MemberKey, string> = {
  lena: '레나 (LENA)',
  runa: '루나 (RUNA)',
  dowon: '도원 (DOWON)',
  rahel: '라헬 (RAHEL)'
}

export const OFFICIAL_TWITTER = {
  handle: 'fkeysofficial',
  url: 'https://twitter.com/fkeysofficial'
}
