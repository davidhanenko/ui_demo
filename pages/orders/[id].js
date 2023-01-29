import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Order from '../../components/orders_admin/single-order/Order';
import LoaderContainer from '../../components/shared/loaders/loader-container/LoaderContainer';

const ORDER_QUERY = gql`
  query ORDER_QUERY($id: ID!) {
    order(id: $id) {
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

export default function OrderPage({ query }) {
  const { data, error, loading } = useQuery(ORDER_QUERY, {
    variables: {
      id: query.id,
    },
  });

  const order = data?.order?.data;

  if (loading) return <LoaderContainer height={'50vh'} />;

  return <Order order={order} />;
}

export async function getServerSideProps(props) {
  let layout = 'main';

  return {
    props: {
      layout,
    },
  };
}