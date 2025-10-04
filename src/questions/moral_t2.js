const moralT2Base = [

];

// Embed zh fields directly (defaulting to BM text for consistency when translations are not provided)
export const moralT2 = moralT2Base.map((q) => ({
  ...q,
  zhQuestion: q.zhQuestion ?? q.question,
  zhOptions: Array.isArray(q.zhOptions) && q.zhOptions.length === (q.options?.length || 0)
    ? q.zhOptions
    : (Array.isArray(q.options) ? [...q.options] : []),
}));
