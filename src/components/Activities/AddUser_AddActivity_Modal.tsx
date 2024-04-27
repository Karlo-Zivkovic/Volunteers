import { useState } from "react";
import { Button, Modal, message } from "antd";

interface AddUser_AddActivity_ModalProps {
  buttonTitle: string;
  modalTitle: string;
  id?: string;
  volunteers?:
    | { name: string; img: string; location: string; email: string }[]
    | undefined;
  fetch: () => Promise<void>;
  FormComponent: React.ComponentType<{
    handleOk: () => void;
    id: string;
    volunteers?:
      | { name: string; img: string; location: string; email: string }[]
      | undefined;
  }>;
}

export default function AddUser_AddActivity_Modal({
  id,
  volunteers,
  fetch,
  FormComponent,
  buttonTitle,
  modalTitle,
}: AddUser_AddActivity_ModalProps) {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    fetch();
    message.success("You have successfully joined the event!");
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
      <Modal
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
      </Modal>
    </>
  );
}
