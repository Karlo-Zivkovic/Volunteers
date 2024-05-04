import { useState } from "react";
import { Button, Modal as ModalAntd, message } from "antd";

interface ModalProps {
  buttonTitle: string | React.ReactNode;
  modalTitle: string;
  id?: string;
  volunteers?:
    | { name: string; img: string;  email: string }[]
    | undefined;
  fetch: () => Promise<void>;
  FormComponent: React.ComponentType<{
    handleOk: () => void;
    id: string;
    volunteers?:
      | { name: string; img: string;  email: string }[]
      | undefined;
  }>;
  successMessage: string;
}

export default function Modal({
  id,
  volunteers,
  fetch,
  FormComponent,
  buttonTitle,
  modalTitle,
  successMessage,
}: ModalProps) {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    fetch();
    if (successMessage) {
      message.success(successMessage);
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        size="large"
        className="font-semibold"
      >
        {buttonTitle}
      </Button>
      <ModalAntd
        open={open}
        title={
          <p className="text-2xl text-blue-500 font-bold underline pb-1">
            {modalTitle}
          </p>
        }
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <FormComponent handleOk={handleOk} id={id!} volunteers={volunteers} />
      </ModalAntd>
    </>
  );
}
