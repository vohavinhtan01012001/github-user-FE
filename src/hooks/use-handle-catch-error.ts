import { EToast } from '@/models/enums/shared.enum';
import { TFailureResponse } from '@/models/types/auth.type';
import { isFailureResponse, showToast } from '@/utils/shared.util';

export const useHandleCatchError = () => {

  const handleCatchError = <D>(props: unknown) => {
    switch (true) {
      case isFailureResponse(props as TFailureResponse<D>): {
        const errorProp = props as TFailureResponse<D>;
        const errorData = errorProp.error.data;
        const errorCode = errorProp.error.code;
        const errorMessage =
          errorCode
            ? errorCode
            : errorProp.error.message;
        showToast(errorMessage, EToast.Error);
        return errorData;
      }

      case props instanceof Error:
        showToast(props.message, EToast.Error);
        break;

      default:
        console.error(props);
    }
  };

  return { handleCatchError };
};
