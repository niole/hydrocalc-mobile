import * as React from 'react';
/**
 * form goes to whatever unfocused input is there that is not filled out yet or not edited by the user
 * form is type safe, lets user provide default data, lets user specify the shape of the submitted data,
 * does validation on mount, on submit and in betweenA
 *
 * provides handlers to the children, which the children can use, they can render themselves
 * maybe there's a form chld with access to a centra state
 *
 * reports
 */

type ValidatorResultValue = { kind: 'error' | 'warning' | 'info', message: string } | undefined;

type ValidatorResult<B extends { [k: string]: any }> = Record<keyof B, ValidatorResultValue>;

type Validator<B extends { [k: string]: any }> = (before: B) => ValidatorResult<B>;

type FormState<B extends { [k: string]: any }, A extends B> = {
  state: B,
  validationState: ValidatorResult<B>,
  submittable?: A
};

export function formHook<B extends { [k: string]: any }, A extends B>(
  initialState: B,
  validator: Validator<B>
): [FormState<B, A>, (state: B) => void] {
  const [state, setFormState] = React.useState<B>(initialState);
  const [validationState, setValidationState] = React.useState<ValidatorResult<B>>(validator(initialState));

  React.useEffect(() => {
    setValidationState(validator(state));
  }, [state]);

  return [{
      state,
      validationState,
      submittable: getSubmitableState(state, validationState)
    },
    setFormState
  ];
}

function getSubmitableState<B extends {}, A extends B>(state: B, validationState: ValidatorResult<B>): A | undefined {
    if (!Object.values(validationState).find(v => v !== undefined)) {
      return state as A;
    }
}
