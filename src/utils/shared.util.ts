import { EResponseStatus, EToast } from '@/models/enums/shared.enum';
import { TFailureResponse } from '@/models/types/auth.type';
import { notification } from 'antd';
import { capitalize } from 'lodash-es';

export const isFailureResponse = (
  response: Error | TFailureResponse,
): response is TFailureResponse => {
  return (
    typeof response === 'object' &&
    response !== null &&
    'status' in response &&
    response.status === EResponseStatus.Failure
  );
};

export const showToast = (
  description: string,
  type = EToast.Success,
  message: string = capitalize(type),
) => {
  notification[type]({
    description,
    duration: 3,
    message,
  });
};
