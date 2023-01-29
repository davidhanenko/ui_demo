import dynamic from 'next/dynamic';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import LoaderContainer from '../../components/shared/loaders/loader-container/LoaderContainer';

const Orders = dynamic(
  () =>
    import('../../components/orders_admin/orders/Orders'),
  {
    loading: () => <LoaderContainer height={'70vh'} />,
  }
);

const ALL_ORDER_QUERY = gql`
  query ALL_ORDER_QUERY {
    orders {
      data {
        id
        attributes {
          charge
          totalItems
          createdAt
          itemDetails: item_details
        }
      }
    }
  }
`;

export default function OrdersPage() {
  const { data, error, loading } =
    useQuery(ALL_ORDER_QUERY);

  const orders = data?.orders?.data;

  return <Orders orders={orders} />;
}

export async function getServerSideProps(props) {
  let layout = 'main';

  return {
    props: {
      layout,
    },
  };
}