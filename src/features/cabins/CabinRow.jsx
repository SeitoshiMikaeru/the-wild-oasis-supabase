import styled from "styled-components";
import {formatCurrency} from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { useAddCabin } from "./useAddCabin";
import {HiPencil, HiSquare2Stack, HiTrash} from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono",serif;
`;

const Price = styled.div`
  font-family: "Sono",serif;
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono",serif;
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({cabin}) {
    const {name, maxCapacity, regularPrice, discount, image, id: cabinId, description} = cabin;

    const {isDeleting, deleteCabin} = useDeleteCabin();
    const {isAdding, createCabin} = useAddCabin();

    const isWorking = isDeleting || isAdding;

    return (
      <>
      <Table.Row>
            <Img src={image} alt={`cabin-${name}`} />
            <Cabin>{name}</Cabin>
            <div>Fits up to {maxCapacity} guests</div>
            <Price>{formatCurrency(regularPrice)}</Price>
            {
              discount > 0 ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>
            }
            <div>
                  <Modal>
                    <Menus.Menu>
                      <Menus.Toggle id={cabinId} />

                      <Menus.List id={cabinId}>
                        <Menus.Button 
                          icon={<HiSquare2Stack />} 
                          onClick={() => createCabin({name: `Copy of ${name}`, description, maxCapacity, regularPrice, discount, image})}
                        >
                          Duplicate
                        </Menus.Button>

                          <Modal.Open opens="edit-form">
                            <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                          </Modal.Open>

                          <Modal.Open opens="delete-confirm">
                            <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                          </Modal.Open>
                       </Menus.List>

                       <Modal.Window name="edit-form">
                          <CreateCabinForm cabinToEdit={cabin} />
                       </Modal.Window>

                       <Modal.Window name="delete-confirm">
                          <ConfirmDelete resourceName={`cabin "${name}"`} onConfirm={() => deleteCabin(cabinId)} disabled={isWorking} />
                       </Modal.Window>
                    </Menus.Menu>
                  </Modal>

                    
            </div>
            
        </Table.Row>
      </>
        
    );
}
