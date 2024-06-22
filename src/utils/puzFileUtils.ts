const MAGICSTR: string = "ACROSS&DOWN";

enum HeaderType {
  Int16LE,
  String,
  HexString,
  Int8,
  Boolean,
};

type HeaderDef = {
  name: string,
  start: number,
  len: number,
  type: HeaderType,
};

const HeaderFmt: HeaderDef[] = [
  {
    name: "checksum",
    start: 0x00,
    len: 0x02,
    type: HeaderType.Int16LE,
  },
  {
    name: "fileMagic",
    start: 0x02,
    len: 0x0B,
    type: HeaderType.String,
  },
  {
    name: "cibChecksum",
    start: 0x0E,
    len: 0x02,
    type: HeaderType.Int16LE,
  },
  {
    name: "maskedLowCheckSums",
    start: 0x10,
    len: 0x04,
    type: HeaderType.HexString,
  },
  {
    name: "maskedHighCheckSums",
    start: 0x14,
    len: 0x04,
    type: HeaderType.HexString,
  },
  {
    name: "version",
    start: 0x18,
    len: 0x04,
    type: HeaderType.String,
  },
  {
    name: "reserved1C",
    start: 0x1C,
    len: 0x1c,
    type: HeaderType.HexString,
  },
  {
    name: "scrambledChecksum",
    start: 0x1E,
    len: 0x02,
    type: HeaderType.Int16LE,
  },
  {
    name: "reserved20",
    start: 0x20,
    len: 0x0C,
    type: HeaderType.HexString,
  },
  {
    name: "width",
    start: 0x2C,
    len: 0x01,
    type: HeaderType.Int8,
  },
  {
    name: "height",
    start: 0x2D,
    len: 0x01,
    type: HeaderType.Int8,
  },
  {
    name: "scrambled",
    start: 0x32,
    len: 0x01,
    type: HeaderType.Boolean,
  },
  {
    name: "clueCount",
    start: 0x2E,
    len: 0x02,
    type: HeaderType.Int16LE,
  },
  {
    name: "unknownBitmask",
    start: 0x30,
    len: 0x02,
    type: HeaderType.Int16LE,
  },
  {
    name: "scambledtag",
    start: 0x32,
    len: 0x02,
    type: HeaderType.Int16LE,
  },
];

const gridStartPos = 0x34;

export type PuzFile = {
  title: string,
  author: string,
  copyright: string,
  notes: string,
  grid: string[],
  state: string[],
  version: string,
  height: number,
  width: number,
  checksum: number,
  clueCount: number,
  clues: string[],
};

const parseHeaderComponent = (data: Buffer, component: string) => {
  const def = HeaderFmt.find( d => d.name === component);
  if(!def)
    return Buffer.alloc(0);

  const buf = data.subarray(def.start, def.start + def.len);
  return buf || Buffer.alloc(0);
};

export const parsePuzFile = (puzBuf: Buffer): PuzFile => {
  const ret: PuzFile = {
    title:"",
    author:"",
    copyright:"",
    notes: "",
    height: 0,
    width: 0,
    grid: [],
    state: [],
    version: "",
    checksum: 0,
    clueCount: 0,
    clues: [],
  };

  // Seek to the magic string, data can exist before it and is ignored
  const magicIdx = puzBuf.indexOf(MAGICSTR);
  const checksumDef = HeaderFmt.find( x => x.name === 'checksum');
  if(!checksumDef)
    throw "Internal Error";

  const headerStartIdx = magicIdx - checksumDef?.len;
  if(headerStartIdx === -1)
    throw "Unknown file type, could not find magic string ACROSS&DOWN";

  const headerBuf = puzBuf.subarray(headerStartIdx);

  ret.height = parseHeaderComponent(headerBuf, 'height').readInt8();
  ret.width = parseHeaderComponent(headerBuf, 'width').readInt8();
  ret.version = parseHeaderComponent(headerBuf, 'version').toString();
  ret.clueCount = parseHeaderComponent(headerBuf, 'clueCount').readInt8();

  const gridLen = ret.height * ret.width;
  const gridBuf = puzBuf.subarray(headerStartIdx + gridStartPos,
                                  headerStartIdx + gridStartPos + gridLen);
  ret.grid = gridBuf.toString().split('');

  const stateBuf = puzBuf.subarray(headerStartIdx + gridStartPos + gridLen,
                                   headerStartIdx + gridStartPos + (gridLen * 2));
  ret.state = stateBuf.toString().split('');

  // the rest of the grid should be a series of null terminated strings
  const stringsSectionIdx = headerStartIdx + gridStartPos + (gridLen*2);
  const stringsBuf = puzBuf.subarray(stringsSectionIdx);
  const strings = stringsBuf.toString().split('\0');

  // the first three of which are the title, author and copyright respectively
  ret.title = strings[0];
  ret.author = strings[1];
  ret.copyright = strings[2];

  ret.clues = strings.slice(3, 3 + ret.clueCount);
  return ret;
};
