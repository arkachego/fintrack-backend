// Enums
import { Operator } from "../enums/OperatorEnum";

type ValueReferenceType = {
  field: string;
  operator: Operator.EQUAL
    | Operator.NOT_EQUAL
    | Operator.GREATER_THAN
    | Operator.GREATER_THAN_OR_EQUAL
    | Operator.LESS_THAN
    | Operator.LESS_THAN_OR_EQUAL
    | Operator.LIKE
    | Operator.ILIKE;
  reference: string | number | boolean;
};

type ArrayReferenceType = {
  field: string;
  operator: Operator.IN
    | Operator.NOT_IN;
  reference: Array<string | number>;
};

export type SegmentType = {
  page: number;
  item: number;
};

export type CriteriaType = ValueReferenceType | ArrayReferenceType;

export type QueryType = {
  segment?: SegmentType;
  criteria: CriteriaType[],
};
