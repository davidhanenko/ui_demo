import styled from 'styled-components';

const CartItemStyles = styled.li`
  list-style: none;
  width: 100%;
  padding: 1.5rem 2rem 1.5rem 1rem;
  margin: 2rem 0;
  display: grid;
  grid-template-columns: auto 1fr auto;

  .item-img {
    padding: 0 2rem 0 1rem;
    display: flex;
    align-items: center;
  }

  .item-details {
    padding-right: 2rem;
    font-size: 1.5rem;

    .title-size-container {
      display: flex;
      align-items: center;
      line-height: 1;

      .item-title {
        margin: 1.3rem 0;
        font-weight: 400;
        transition: all 0.25s;

        @media (hover: hover) {
          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }
      }

      .item-type,
      .item-size {
        align-items: center;

        &::before {
          content: '|';
          font-weight: 300;
          margin: 0 1rem;
          color: var(--blue3);
        }
      }
      @media (max-width: 650px) {
        font-size: 1.3rem;

        .item-type,
        .item-size {
          &::before {
            content: '|';
            margin: 0 0.5rem;
          }
        }
      }
    }

    .price-amount-container {
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 1em;
      position: relative;

      p {
        margin: 0;
      }

      .no-item-price {
        font-size: 1.5rem;
        line-height: 1.6rem;
        font-weight: 300;
      }

      @media (max-width: 650px) {
        font-size: 1.3rem;
      }
    }
  }
  .item-remove {
    cursor: pointer;
    display: flex;
    font-size: 2.2rem;
    align-items: center;
    svg {
      transition: all 0.25s;
      color: var(--red);

      @media (hover: hover) {
        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }
`;

const QtyControlStyles = styled.div`
  display: flex;
  height: 2.8rem;
  justify-self: start;

  button {
    cursor: pointer;
    width: 2.3rem;
    height: 100%;
    border: 1px solid var(--blue5);
    background-color: var(--blue4);
    display: flex;
    align-items: center;
    justify-content: center;

    &:nth-child(2n + 1) {
      border-radius: 0 5px 5px 0;
    }

    &:nth-child(1) {
      border-radius: 5px 0 0 5px;
    }
  }

  input {
    height: 100%;
    width: 3rem;
    text-align: center;
    border: 1px solid var(--blue5);
    font-size: 1.6rem;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  @media (max-width: 650px) {
    position: absolute;
    top: 100%;
  }
`;

export { CartItemStyles, QtyControlStyles };
