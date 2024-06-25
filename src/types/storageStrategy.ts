export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | {[key: string]: JSONValue}

export type UseStorage = <Type>(key: string, def: Type) => [
  () => Type,
  (obj: Type) => void
]
