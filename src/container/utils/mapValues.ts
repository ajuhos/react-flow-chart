export function mapValues<
  Obj extends object,
  Res extends { [key in Extract<keyof Obj, string>]: any }
> (o: Obj, func: (value: Obj[keyof Obj]) => Res[Extract<keyof Obj, string>]) {
  const res: Res = {} as any
  for (const key in o) {
    if (o.hasOwnProperty(key)) {
      res[key] = func(o[key])
    }
  }
  return res
}
