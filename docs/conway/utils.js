export const amount_combinator = (...a)=> (T) => a.reduce((a,c)=> a*c) * (T.BYTES_PER_ELEMENT) ** (a.length);