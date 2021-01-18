import { Reactotron } from 'reactotron-core-client';
declare const reactotronRecoil: () => (reactotron: Reactotron) => {
    onCommand({ type, payload }: {
        type: string;
        payload: {
            path: string;
            paths: [];
        };
    }): void;
};
export default reactotronRecoil;
