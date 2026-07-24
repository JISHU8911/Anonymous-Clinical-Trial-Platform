import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
  initializeTrial(context: __compactRuntime.CircuitContext<PS>,
                  initialTrialId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  submitFeedback(context: __compactRuntime.CircuitContext<PS>,
                 patientSecret_0: Uint8Array,
                 rating_0: bigint,
                 adverseEventFlag_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  toggleTrialStatus(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
}

export type ProvableCircuits<PS> = {
  initializeTrial(context: __compactRuntime.CircuitContext<PS>,
                  initialTrialId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  submitFeedback(context: __compactRuntime.CircuitContext<PS>,
                 patientSecret_0: Uint8Array,
                 rating_0: bigint,
                 adverseEventFlag_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  toggleTrialStatus(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
}

export type Circuits<PS> = {
  initializeTrial(context: __compactRuntime.CircuitContext<PS>,
                  initialTrialId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  submitFeedback(context: __compactRuntime.CircuitContext<PS>,
                 patientSecret_0: Uint8Array,
                 rating_0: bigint,
                 adverseEventFlag_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  toggleTrialStatus(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
}

export type Ledger = {
  readonly trialId: bigint;
  readonly totalResponses: bigint;
  readonly adverseEventCount: bigint;
  readonly ratingSum: bigint;
  readonly isTrialActive: boolean;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
