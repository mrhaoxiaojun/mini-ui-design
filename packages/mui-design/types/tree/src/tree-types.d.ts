import type { PropType, ExtractPropTypes } from 'vue';
export interface TreeItem {
    label: string;
    children: TreeData;
    [key: string]: any;
}
export declare type TreeData = Array<TreeItem>;
export declare const treeProps: {
    readonly data: {
        readonly type: PropType<TreeData>;
        readonly default: () => never[];
    };
};
export declare type TreeProps = ExtractPropTypes<typeof treeProps>;
