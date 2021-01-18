import React from 'react';
import { RecoilRootProps } from 'recoil';
import { Reactotron } from 'reactotron-core-client';
declare class RecoilState {
    state: Record<string, unknown>;
    subscriptions: string[];
    reactotron?: Reactotron;
    onChange: (lastState: Record<string, unknown>, nextState: Record<string, unknown>) => void;
    setState(nextState: Record<string, unknown>): void;
    getKeys(): string[];
    getState(): {
        [x: string]: unknown;
    };
    setSubscriptions(paths: string[], reactotron?: Reactotron): void;
    serveSubscriptions(): void;
}
export declare const MainRecoilState: RecoilState;
declare const ReactotronRecoilRoot: React.FC<RecoilRootProps>;
export default ReactotronRecoilRoot;
