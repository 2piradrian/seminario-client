export enum EntityType {
  USER = 0b0001,
  PAGE = 0b0010,
  POST = 0b0011,
  COMMENT = 0b0100,
  IMAGE = 0b0101,
}

export function resolveEntityType(uuid: string): EntityType {
  const bytes = uuidToBytes(uuid);

  // Primer byte
  const firstByte = bytes[0];
  const prefix = (firstByte & 0xf0) >> 4;

  switch (prefix) {
    case EntityType.USER:
      return EntityType.USER;
    case EntityType.PAGE:
      return EntityType.PAGE;
    case EntityType.POST:
      return EntityType.POST;
    case EntityType.COMMENT:
      return EntityType.COMMENT;
    case EntityType.IMAGE:
      return EntityType.IMAGE;
    default:
      throw new Error(`Unknown entity type prefix: ${prefix}`);
  }
}

function uuidToBytes(uuid: string): Uint8Array {
  const hex = uuid.replace(/-/g, "");
  const bytes = new Uint8Array(16);
  for (let i = 0; i < 16; i++) {
    bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}
