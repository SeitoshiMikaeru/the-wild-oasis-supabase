import { useState } from "react";

import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";

export default function AddCabin() {
    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
    <div>
        <Button onClick={() => setIsOpenModal(true)}>Add new cabin</Button>
        {
            isOpenModal && 
                <Modal handleCloseModal={() => setIsOpenModal(false)}>
                    <CreateCabinForm handleCloseModal={() => setIsOpenModal(false)} />
                </Modal>
        }
    </div>
    
  );
}
