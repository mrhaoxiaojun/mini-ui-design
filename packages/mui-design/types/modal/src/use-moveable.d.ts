import { SetupContext } from 'vue';
import { ModalProps } from './modal-types';
export declare const useMoveable: (props: ModalProps, ctx: SetupContext<Record<string, any>>) => {
    is_moving: import("vue").Ref<boolean>;
    modalDomInner: import("vue").Ref<any>;
    modalHeader: import("vue").Ref<any>;
    modalBody: import("vue").Ref<any>;
    oldLocate: any;
    handleMoveStart: (event: any) => void;
    handleResizeStart: (event: any) => Promise<void>;
    getLocate: () => Promise<void>;
};
