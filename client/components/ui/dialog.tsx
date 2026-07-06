/**
 * @deprecated This file is maintained for backward compatibility.
 * Please use the Modal component from '@/components/ui/Modal' for new implementations.
 * 
 * This wrapper ensures existing Dialog usages continue working without changes
 * while we migrate to the new LD 3.5 Modal component.
 */

import {
  Modal,
  ModalTrigger,
  ModalPortal,
  ModalClose,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from './Modal';

// Export Modal components with Dialog naming for backward compatibility
export const Dialog = Modal;
export const DialogTrigger = ModalTrigger;
export const DialogPortal = ModalPortal;
export const DialogClose = ModalClose;
export const DialogOverlay = ModalOverlay;
export const DialogContent = ModalContent;
export const DialogHeader = ModalHeader;
export const DialogTitle = ModalTitle;
export const DialogDescription = ModalDescription;
export const DialogFooter = ModalFooter;

// Also export the new Modal names for gradual migration
export {
  Modal,
  ModalTrigger,
  ModalPortal,
  ModalClose,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
};
