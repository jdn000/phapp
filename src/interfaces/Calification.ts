export interface Calification {
  id?: number;
  calificationObjectiveId?: number;
  objectiveId?: number;
  alumnId: number;
  subjectId: number;
  value: number;
  isCummulative: boolean;
  indicators?: number[];
}

export interface CalificationIndicator {
  id?: number;
  calificationId?: number;
  indicatorId?: number;


}