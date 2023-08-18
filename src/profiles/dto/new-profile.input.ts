import { InputType, Field, Float, Int } from '@nestjs/graphql';

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
  @Field(() => RadarDataInput)
  SP: RadarDataInput;

  @Field(() => RadarDataInput)
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
}
