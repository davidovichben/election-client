export class UserModel {
  // @ts-ignore
  id: number;
  // @ts-ignore
  username: string;
}

export enum Stance {
  Supporter = 'supporter',
  Opponent = 'opponent',
  Undecided = 'undecided'
}

export const VotedSelect = [{ label: 'כן', value: 1 }, { label: 'לא', value: '0' }];

export const StanceSelect = [
  { label: 'תומך', value: 'supporter' },
  { label: 'מתנגד', value: 'opponent' },
  { label: 'לא ידוע', value: 'undecided' }
];
