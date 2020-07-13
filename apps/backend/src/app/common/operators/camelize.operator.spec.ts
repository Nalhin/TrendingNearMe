import { of } from 'rxjs';
import { camelize } from './camelize.operator';

describe('Camelize operator', () => {
  it('should convert object to camel case', (done) => {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const snakeCaseObject = { prop_a: 'testa', prop_b_c: 'testbc' };

    of(snakeCaseObject)
      .pipe(camelize())
      .subscribe((obj) => {
        expect(obj.propA).toBe(snakeCaseObject.prop_a);
        expect(obj.propBC).toBe(snakeCaseObject.prop_b_c);
        done();
      });
  });
});
