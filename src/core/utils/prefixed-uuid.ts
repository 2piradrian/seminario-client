import { EntityType } from "../../domain";

export class PrefixedUUID {

 static resolveType(uuid: string): EntityType {
      const hex = uuid.replace(/-/g, '');
  
      if (hex.length !== 32) {
          throw new Error(`Invalid UUID: ${uuid}`);
      }
  
      const firstByte = parseInt(hex.substring(0, 2), 16);
  
      const prefix = (firstByte & 0xF0) >> 4;
  
      for (const key in EntityType) {
          const value = EntityType[key as keyof typeof EntityType];
          if (value === prefix) {
              return value;
          }
      }
  
      throw new Error(`Unknown entity prefix: ${prefix}`);
  }

}
