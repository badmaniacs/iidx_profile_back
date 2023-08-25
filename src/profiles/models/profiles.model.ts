import {
  Field,
  GraphQLISODateTime,
  Int,
  ObjectType,
  Float,
} from '@nestjs/graphql';
import { ProfileData as ProfileDB } from '@prisma/client';

enum ClassLevel {
  NOVICE = 'NOVICE',
  NORMAL = 'NORMAL',
  HYPER = 'HYPER',
  ANOTHER = 'ANOTHER',
  LEGGENDARIA = 'LEGGENDARIA',
}

enum ClearType {
  NO_PLAY = 'NO_PLAY',
  F_COMBO = 'F_COMBO',
  A_CLEAR = 'A_CLEAR',
  H_CLEAR = 'H_CLEAR',
}

enum PlayType {
  SP = 'SP',
  DP = 'DP',
}

@ObjectType()
class Music {
  @Field()
  music_name: string;

  @Field(() => Int)
  level: number;

  @Field(() => String)
  difficulty: ClassLevel;

  @Field()
  rank: string;

  @Field()
  score: string;

  @Field(() => String)
  clear_type: ClearType;

  @Field(() => String)
  play_type: PlayType;
}

@ObjectType()
class Radar {
  @Field(() => [Float])
  NOTES: number[];

  @Field(() => [Float])
  CHORD: number[];

  @Field(() => [Float])
  PEAK: number[];

  @Field(() => [Float])
  CHARGE: number[];

  @Field(() => [Float])
  SCRATHCH: number[];

  @Field(() => [Float])
  SOFLAN: number[];

  @Field(() => [Float])
  TOTAL: number[];
}

@ObjectType()
class RadarData {
  @Field(() => Radar)
  SP: Radar;
  @Field(() => Radar)
  DP: Radar;
}

@ObjectType()
class ArenaData {
  @Field()
  SP: string;

  @Field()
  DP: string;
}

@ObjectType()
class ClassData {
  @Field()
  SP: string;

  @Field()
  DP: string;
}

@ObjectType()
class MusicData {
  @Field(() => [Music])
  SP: Music[];
  @Field(() => [Music])
  DP: Music[];
}

@ObjectType()
export class Profile {
  @Field(() => Int)
  id: ProfileDB['id'];

  @Field(() => GraphQLISODateTime)
  createAt: Date;

  @Field(() => String)
  djName: ProfileDB['djName'];

  @Field(() => String)
  region: ProfileDB['region'];

  @Field(() => String)
  iidxId: ProfileDB['iidxId'];

  @Field(() => ClassData)
  class: ProfileDB['class'];

  @Field(() => ArenaData)
  arena: ProfileDB['arena'];

  @Field(() => RadarData)
  radar: ProfileDB['radar'];

  @Field(() => MusicData)
  musicData: ProfileDB['musicData'];

  @Field(() => Int)
  ver: ProfileDB['ver'];
}
