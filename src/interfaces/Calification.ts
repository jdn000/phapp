export interface Calification {
  id?: number;
  calificationObjectiveId?: number;
  objectiveId?: number;
  alumnId: number;
  subjectId: number;
  value: number;
  isCummulative: boolean;
}

