import { MINUTE, SECOND } from './constants'

const getDuration = (millisecondTime: number) => {
  const PAD_LENGTH = 2
  const REPLACER = '0'

  return {
    minutes: Math.floor(millisecondTime / MINUTE)
      .toString()
      .padStart(PAD_LENGTH, REPLACER),
    seconds: Math.floor((millisecondTime % MINUTE) / SECOND)
      .toString()
      .padStart(PAD_LENGTH, REPLACER),
  }
}

export { getDuration }
