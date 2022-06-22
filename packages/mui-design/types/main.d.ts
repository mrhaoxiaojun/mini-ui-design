import type { App } from 'vue';
import { Button } from './button';
import { Modal } from './modal';
import locale from './_i18n/i18n';
import './_style/style.scss';
export { locale, Button, Modal };
declare const _default: {
    install(app: App): void;
};
export default _default;
