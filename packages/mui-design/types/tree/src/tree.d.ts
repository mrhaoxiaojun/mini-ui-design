import { TreeData } from './tree-types';
import './tree.scss';
declare const _default: import("vue").DefineComponent<{
    readonly data: {
        readonly type: import("vue").PropType<TreeData>;
        readonly default: () => never[];
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, never[], never, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly data: {
        readonly type: import("vue").PropType<TreeData>;
        readonly default: () => never[];
    };
}>> & {}, {
    data: TreeData;
}>;
export default _default;
