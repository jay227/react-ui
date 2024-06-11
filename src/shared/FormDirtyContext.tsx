import { createContext, useCallback, useContext } from "react";

type FormDirtyContext = {
  dirtyForms: string[];
}

function initialize(): FormDirtyContext {
  return {dirtyForms: Array.of<string>()};
}

const FormDirtyState = createContext<FormDirtyContext>(initialize());

export function FormDirtyProvider({children}: {children?: React.ReactNode}): JSX.Element {
  return <FormDirtyState.Provider value={initialize()}>{children}</FormDirtyState.Provider>;
}

export function useFormDirtyContext() {
  const ctx = useContext(FormDirtyState);
  if (!ctx) {
    throw new Error('useFormDirtyContext must be used within a provider');
  }

  const isFormDirty = useCallback((formId: string) => ctx.dirtyForms.includes(formId), [ctx]);

  const isAnyFormDirty = useCallback(() => ctx.dirtyForms.length > 0, [ctx]);

  const setFormDirtyState = useCallback((formId: string, isDirty: boolean) => {
    if (isDirty) {
      if (!ctx.dirtyForms.includes(formId)) {
        ctx.dirtyForms = [...ctx.dirtyForms, formId];
      }
    } else {
      const index = ctx.dirtyForms.indexOf(formId);
      if (index > -1) {
        const newForms = [...ctx.dirtyForms];
        newForms.splice(index, 1,);
        ctx.dirtyForms = newForms;
      }
    }
  }, [ctx]);

  const clearFormDirtyState = useCallback(() => ctx.dirtyForms = [], [ctx]);

  return {
    ctx,
    isFormDirty,
    isAnyFormDirty,
    setFormDirtyState,
    clearFormDirtyState
  };
}