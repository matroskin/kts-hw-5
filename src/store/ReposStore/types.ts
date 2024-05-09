import { queryParamsType } from 'store/RootStore/QueryParamsStore/QueryParamsStore';

export type getReposListParams = {
  name: queryParamsType;
  page?: queryParamsType;
  type?: queryParamsType;
};
