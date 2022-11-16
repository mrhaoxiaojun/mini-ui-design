import type { ExtractPropTypes } from 'vue';
export declare const modalProps: {
    readonly id: {
        readonly type: StringConstructor;
        readonly default: "";
        readonly required: true;
    };
    readonly title: {
        readonly type: StringConstructor;
        readonly required: true;
        readonly default: "test";
    };
    readonly mask: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly titleIcon: {
        readonly type: ObjectConstructor;
        readonly default: () => {
            iconType: string;
            iconClass: string;
        };
    };
    readonly data: {
        readonly type: ObjectConstructor;
        readonly default: () => void;
    };
    readonly parentData: {
        readonly type: ArrayConstructor;
        readonly default: () => void;
    };
    readonly defaultDomId: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly defaultW: {
        readonly type: NumberConstructor;
        readonly default: 500;
    };
    readonly defaultH: {
        readonly type: NumberConstructor;
        readonly default: 300;
    };
    readonly maxDomId: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly maxW: {
        readonly type: NumberConstructor;
        readonly default: 800;
    };
    readonly maxH: {
        readonly type: NumberConstructor;
        readonly default: 500;
    };
    readonly minW: {
        readonly type: NumberConstructor;
        readonly default: 150;
    };
    readonly minH: {
        readonly type: NumberConstructor;
        readonly default: 150;
    };
    readonly defaultPosition: {
        readonly type: ObjectConstructor;
        readonly default: () => {
            x: number;
            y: number;
        };
    };
    readonly maxPosition: {
        readonly type: ObjectConstructor;
        readonly default: () => {
            x: number;
            y: number;
        };
    };
    readonly isShowMin: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
};
export declare type ModalProps = ExtractPropTypes<typeof modalProps>;
