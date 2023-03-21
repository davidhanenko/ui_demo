import Image from 'next/image';
import styled from 'styled-components';
import emptyCartImg from '../../public/img/empty-cart.png';

const EmptyCartStyles = styled.div`
  text-align: center;
  padding-top: 5rem;

  p {
    font-size: 1.8rem;
    font-weight: 300;
    margin-top: 5rem;
    color: var(--blue3);
  }
`;

export default function EmptyCart() {
  return (
    <EmptyCartStyles>
      <Image src={emptyCartImg} width={150} height={150} />
      <p>Cart is empty</p>
    </EmptyCartStyles>
  );
}
