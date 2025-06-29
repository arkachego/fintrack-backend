// Enums
import { Operator } from "../enums/OperatorEnum";

type ValueReferenceType = {
  field: string;
  operator: Operator.EQUALS
    | Operator.NOT_EQUALS
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

type CriteriaType = ValueReferenceType | ArrayReferenceType;

type SegmentType = {
  page: number;
  item: number;
};

export type QueryType = {
  criteria: CriteriaType[],
  segment?: SegmentType;
};
