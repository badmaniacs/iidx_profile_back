import { InputType, Field, Int } from '@nestjs/graphql';

enum ClassLevel {
  NOVICE = 'NOVICE',
  NORMAL = 'NORMAL',
  HYPER = 'HYPER',
  ANOTHER = 'ANOTHER',
  LEGGENDARIA = 'LEGGENDARIA',
}

enum ClearType {
  NO_PLAY = 'NO_PLAY',
  FAILED = 'FAILED',
  A_CLEAR = 'A_CLEAR',
  E_CLEAR = 'E_CLEAR',
  CLEAR = 'CLEAR',
  H_CLEAR = 'H_CLEAR',
  EXH_CLEAR = 'EXH_CLEAR',
  F_COMBO = 'F_COMBO',
}

enum PlayType {
  SP = 'SP',
  DP = 'DP',
}

@InputType()
export class MusicDataInput {
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

@InputType()
class RadarDataInput {
  @Field(() => String)
  NOTES: string;

  @Field(() => String)
  CHORD: string;

  @Field(() => String)
  PEAK: string;

  @Field(() => String)
  CHARGE: string;

  @Field(() => String)
  SCRATHCH: string;

  @Field(() => String)
  SOFLAN: string;

  @Field(() => String)
  TOTAL: string;
}

@InputType()
class ClassDataInput {
  @Field()
  SP: string;

  @Field()
  DP: string;
}

@InputType()
class ArenaDataInput {
  @Field()
  SP: string;

  @Field()
  DP: string;
}

@InputType()
export class RadarInput {
  @Field(() => [RadarDataInput], { name: 'SP' })
  SP: RadarDataInput;

  @Field(() => [RadarDataInput], { name: 'DP' })
  DP: RadarDataInput;
}

@InputType()
export class MusicInput {
  @Field(() => [MusicDataInput], { name: 'SP' })
  SP: MusicDataInput[];

  @Field(() => [MusicDataInput], { name: 'DP' })
  DP: MusicDataInput[];
}

@InputType()
export class CreateProfileInput {
  @Field()
  userId: number;

  @Field()
  djName: string;

  @Field()
  region: string;

  @Field()
  iidxId: string;

  @Field()
  qpro: string;

  @Field(() => ClassDataInput)
  class: {
    SP: string;

    DP: string;
  };

  @Field(() => ArenaDataInput)
  arena: {
    SP: string;

    DP: string;
  };

  @Field(() => RadarInput)
  radar: RadarInput;

  @Field(() => MusicInput)
  musicData: MusicInput;

  @Field()
  ver: number;
}

@InputType()
export class GetProfileInput {
  @Field()
  id: number;
}
