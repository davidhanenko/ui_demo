import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

import {
  AccountStyles,
  OrderItemStyles,
} from './AccountStyles';

const USER_QUERY = gql`
  query USER_QUERY($id: ID!) {
    usersPermissionsUser(id: $id) {
      data {
        id
        attributes {
          username
          email
          phone
        }
      }
    }
  }
`;

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY($id: ID!) {
    orders(
      filters: {
        users_permissions_user: { id: { eqi: $id } }
      }
    ) {
      data {
        id
        attributes {
          order_details
          items_details
          status
          createdAt
          users_permissions_user {
            data {
              id
            }
          }
        }
      }
    }
  }
`;

export default function Account({ id }) {
  const { data, loading, error } = useQuery(USER_QUERY, {
    variables: {
      id,
    },
  });

  const { data: ordersData } = useQuery(USER_ORDERS_QUERY, {
    variables: {
      id,
    },
  });

  const { data: session } = useSession();

  const user = data?.usersPermissionsUser?.data;
  const orders = ordersData?.orders?.data;

  return (
    <AccountStyles>
      {parseInt(user?.id) === session?.id && (
        <>
          <section className='user'>
            <h3>{user?.attributes?.username}</h3>
            <hr />
            <p>{user?.attributes?.email}</p>
            <p>{user?.attributes?.phone}</p>

            <hr />

            <div className='edit-container'>
              <Link href={`${session?.id}/edit`}>Edit</Link>
              <span className='divider'>|</span>
              {!session?.user?.email && (
                <Link href='/auth/password/change-password'>
                  Change password
                </Link>
              )}
            </div>
          </section>
          <section className='orders'>
            <h4>Your orders</h4>
            {orders &&
              orders?.map(order => (
                <OrderItem key={order?.id} order={order} />
              ))}
          </section>
        </>
      )}
    </AccountStyles>
  );
}

function OrderItem({ order }) {
  let orderDetails = order?.attributes?.order_details;
  let itemsDetails = order?.attributes?.items_details;

  orderDetails =
    typeof orderDetails !== 'object'
      ? JSON.parse(orderDetails)
      : orderDetails;

  const charge = orderDetails?.charge;
  const tax = orderDetails?.charge * 0.08875;
  const total = (charge + tax).toFixed(2);
  // const date = new Date(order?.attributes?.createdAt);

  return (
    <OrderItemStyles>
      <section className='top-line'>
        <p>{order.id}</p>
        <p>Charge: ${charge.toFixed(2)}</p>
        <p>Tax: ${tax.toFixed(2)}</p>
        <p>Total: ${total}</p>
        {/* <p>{date}</p> */}
        <p>{order?.attributes?.status}</p>
      </section>
    </OrderItemStyles>
  );
}
