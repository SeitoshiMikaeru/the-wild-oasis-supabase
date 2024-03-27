import styled from "styled-components";
import {formatCurrency} from "../../utils/helpers";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { useAddCabin } from "./useAddCabin";
import {HiPencil, HiSquare2Stack, HiTrash} from "react-icons/hi2";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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

    const [showForm, setShowForm] = useState(false);

    const {isDeleting, deleteCabin} = useDeleteCabin();
    const {isAdding, createCabin} = useAddCabin();

    const isWorking = isDeleting || isAdding;

    return (
      <>
      <TableRow role="row">
            <Img src={image} alt={`cabin-${name}`} />
            <Cabin>{name}</Cabin>
            <div>Fits up to {maxCapacity} guests</div>
            <Price>{formatCurrency(regularPrice)}</Price>
            {
              discount > 0 ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>
            }
            <div>
                <button onClick={() => createCabin({name: `Copy of ${name}`, description, maxCapacity, regularPrice, discount, image})} disabled={isWorking}>
                  <HiSquare2Stack /> 
                </button>
              <button onClick={() => setShowForm(prev => !prev)} disabled={isWorking}>
                <HiPencil />
              </button>
              <button onClick={() => deleteCabin(cabinId)} disabled={isWorking}>
                <HiTrash />
              </button>
            </div>
            
        </TableRow>
        {
          showForm && (
            <CreateCabinForm cabinToEdit={cabin} />
          )
        }
      </>
        
    );
}
