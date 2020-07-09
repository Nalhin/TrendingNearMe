import { map } from 'rxjs/operators';
import * as camelcaseKeys from 'camelcase-keys';

export const camelize = () =>
  map((value: any) =>
    camelcaseKeys(value, {
      deep: true,
    }),
  );
