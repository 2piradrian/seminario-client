import type { Page } from "./page";
import { UserProfile } from "./user-profile";

export class Profile {
  private constructor(
    public id: string,
    public name: string,
    public portraitImage: string,
    public profileImage: string,
    public shortDescription: string,
    public longDescription: string
  ) {}

  public static fromEntity(profile: UserProfile | Page): Profile {
    const name = "surname" in profile
      ? this.buildName(profile.name, profile.surname)
      : profile.name;

    return new Profile(
      profile.id,
      name,
      profile.portraitImage,
      profile.profileImage,
      profile.shortDescription,
      profile.longDescription
    );
  }

  private static buildName(name: string, surname?: string) {
    return surname ? `${name} ${surname}` : name;
  }
}
