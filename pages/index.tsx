import { gql } from "@apollo/client";
import client from "../apollo-client";

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query gerUsers {
        users {
          id
          firstName
          lastName
        }
      }
    `,
  });

  return {
    props: {
      users: data.users,
    },
  };
}

// interface Entry {
//   id: number;
//   title: string;
//   message: string;
// }

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

// export default function Home({ entries }: { entries: [Entry] }) {
export default function Home({ users }: { users: [User] }) {
  return (
    <div>
      <div>
        {/* {entries.map((entry: Entry, index) => (
          <div key={index}>{`${entry.title} - ${entry.message}`}</div>
        ))} */}
        {users.map((user: User, index) => (
          <div key={index}>{`${user.firstName} ${user.lastName}`}</div>
        ))}
      </div>
    </div>
  );
}
